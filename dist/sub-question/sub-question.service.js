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
var SubQuestionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubQuestionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const subquestion_schema_1 = require("../models/subquestion.schema");
const mongoose_2 = require("mongoose");
let SubQuestionService = SubQuestionService_1 = class SubQuestionService {
    constructor(subQuestionModel) {
        this.subQuestionModel = subQuestionModel;
        this.logger = new common_1.Logger(SubQuestionService_1.name);
    }
    async findAll(id) {
        try {
            const subQuestionData = await this.subQuestionModel.find({
                questionId: id,
            });
            if (!subQuestionData || subQuestionData.length == 0) {
                this.logger.error(`subQuestions data not found!`);
                throw new common_1.NotFoundException('subQuestions data not found!');
            }
            return subQuestionData;
        }
        catch (e) {
            throw new common_1.NotFoundException('subQuestions data not found!');
        }
    }
    async findOneU(id) {
        const existingsubQuestion = await this.subQuestionModel.findById(id);
        if (!existingsubQuestion) {
            this.logger.error(`subQuestion #${id} not found`);
            throw new common_1.NotFoundException(`subQuestion #${id} not found`);
        }
        return existingsubQuestion;
    }
    async findOneI(id, uid) {
        const existingsubQuestion = await this.subQuestionModel.findById(id);
        if (existingsubQuestion.createdBy != uid) {
            this.logger.error(`cannot access subQuestion`);
            throw new common_1.NotFoundException(`cannot access subQuestion #${id} - not found`);
        }
        if (!existingsubQuestion) {
            this.logger.error(`subQuestion #${id} not found`);
            throw new common_1.NotFoundException(`subQuestion #${id} not found`);
        }
        return existingsubQuestion;
    }
    async update(id, updateSubQuestionDto) {
        const existingsubQuestion = await this.subQuestionModel.findByIdAndUpdate(id, updateSubQuestionDto, { new: true });
        if (!existingsubQuestion) {
            this.logger.error(`subQuestion #${id} not found`);
            throw new common_1.NotFoundException(`subQuestion #${id} not found`);
        }
        return existingsubQuestion;
    }
    async remove(id) {
        const deletedsubQuestion = await this.subQuestionModel.findByIdAndDelete(id);
        if (!deletedsubQuestion) {
            this.logger.error(`subQuestion #${id} not found`);
            throw new common_1.NotFoundException(`subQuestion #${id} not found`);
        }
        return deletedsubQuestion;
    }
};
exports.SubQuestionService = SubQuestionService;
exports.SubQuestionService = SubQuestionService = SubQuestionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subquestion_schema_1.SubQuestion.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SubQuestionService);
//# sourceMappingURL=sub-question.service.js.map