"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var QuestionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const question_schema_1 = require("../models/question.schema");
const mongoose_2 = require("mongoose");
const subquestion_schema_1 = require("../models/subquestion.schema");
const helpers_1 = require("../utils/helpers");
let QuestionService = QuestionService_1 = class QuestionService {
    constructor(questionModel, subQuestionModel) {
        this.questionModel = questionModel;
        this.subQuestionModel = subQuestionModel;
        this.logger = new common_1.Logger(QuestionService_1.name);
    }
    async createFiveQuestions(createQuestionDto, id) {
        const questionData = await this.questionModel.find({
            ...createQuestionDto,
            createdBy: id,
        });
        if (questionData.length != 0) {
            this.logger.error(`questions data found!`);
            return questionData;
        }
        else {
            const arr = new Array(5).fill({
                testId: createQuestionDto?.testId,
                createdBy: id,
            });
            const ques = await this.questionModel.insertMany(arr);
            const subQuesT = ques.map((item) => ({
                testId: createQuestionDto.testId,
                questionId: item?._id,
                type: 'TEXT',
                createdBy: id,
            }));
            const subQuesA = ques.map((item) => ({
                testId: createQuestionDto.testId,
                questionId: item?._id,
                type: 'AUDIO',
                createdBy: id,
            }));
            const subQ = await this.subQuestionModel.insertMany([
                ...subQuesA,
                ...subQuesT,
            ]);
            return {
                message: `created : ${ques.length} Question , ${subQ.length} Sub Questions`,
            };
        }
    }
    async findAll(id) {
        try {
            const questionData = await this.questionModel.find({
                testId: id,
            });
            if (!questionData || questionData.length == 0) {
                this.logger.error(`questions data not found!`);
                throw new common_1.NotFoundException('questions data not found!');
            }
            const allFields = await (0, helpers_1.getTestFields)(this.subQuestionModel);
            const arr = [];
            for (let ques of questionData) {
                const subQuestionData = await this.subQuestionModel.find({
                    questionId: ques._id,
                });
                const sqR = await Promise.all(subQuestionData.map(async (item) => (await (0, helpers_1.objectParser)(item, allFields))));
                arr.push({ "question": ques, "subquestion": sqR });
            }
            return arr;
        }
        catch (e) {
            throw new common_1.NotFoundException('questions data not found!');
        }
    }
    async findOneU(id) {
        const existingquestion = await this.questionModel.findById(id);
        if (!existingquestion) {
            this.logger.error(`question #${id} not found`);
            throw new common_1.NotFoundException(`question #${id} not found`);
        }
        return existingquestion;
    }
    async findOneI(id, uid) {
        const existingquestion = await this.questionModel.findById(id);
        if (existingquestion.createdBy != uid) {
            this.logger.error(`cannot access question`);
            throw new common_1.NotFoundException(`cannot access question #${id} - not found`);
        }
        if (!existingquestion) {
            this.logger.error(`question #${id} not found`);
            throw new common_1.NotFoundException(`question #${id} not found`);
        }
        const subQuestionData = await this.subQuestionModel.find({
            questionId: id,
        });
        if (!subQuestionData || subQuestionData.length == 0) {
            this.logger.error(`subQuestions data not found!`);
            throw new common_1.NotFoundException('subQuestions data not found!');
        }
        return { ...existingquestion, "subquestion": subQuestionData };
    }
    async update(id, updateQuestionDto) {
        const existingquestion = await this.questionModel.findByIdAndUpdate(id, updateQuestionDto, { new: true });
        if (!existingquestion) {
            this.logger.error(`question #${id} not found`);
            throw new common_1.NotFoundException(`question #${id} not found`);
        }
        return existingquestion;
    }
    async remove(id) {
        const deletedquestion = await this.questionModel.findByIdAndDelete(id);
        if (!deletedquestion) {
            this.logger.error(`question #${id} not found`);
            throw new common_1.NotFoundException(`question #${id} not found`);
        }
        return deletedquestion;
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = QuestionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(question_schema_1.Question.name)),
    __param(1, (0, mongoose_1.InjectModel)(subquestion_schema_1.SubQuestion.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], QuestionService);
//# sourceMappingURL=question.service.js.map