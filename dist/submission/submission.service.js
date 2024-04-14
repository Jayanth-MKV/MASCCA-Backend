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
var SubmissionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const usersubmission_schema_1 = require("../models/usersubmission.schema");
const mongoose_2 = require("mongoose");
const testing_1 = require("@nestjs/testing");
const question_schema_1 = require("../models/question.schema");
const subquestion_schema_1 = require("../models/subquestion.schema");
const bull_1 = require("@nestjs/bull");
let SubmissionService = SubmissionService_1 = class SubmissionService {
    constructor(submissionModel, testModel, questionModel, subquestionModel, audioQueue) {
        this.submissionModel = submissionModel;
        this.testModel = testModel;
        this.questionModel = questionModel;
        this.subquestionModel = subquestionModel;
        this.audioQueue = audioQueue;
        this.logger = new common_1.Logger(SubmissionService_1.name);
    }
    async create(createSubmissionDto) {
        const existingtest = await this.submissionModel.findOne({
            testId: createSubmissionDto.testId,
            userId: createSubmissionDto.userId,
        });
        if (existingtest) {
            return existingtest;
        }
        const qs = await this.questionModel
            .find({ testId: createSubmissionDto.testId })
            .select('+_id').sort({ createdAt: 1 });
        const ans = await Promise.all(qs.map(async (i) => {
            const sq = await this.subquestionModel.find({
                testId: createSubmissionDto.testId,
                questionId: i['_id'],
            });
            return {
                qid: i['_id'].toString(),
                topic: i['topic'],
                content: i['content'],
                subQ: sq.map((s) => ({
                    sqid: s['_id'].toString(),
                    type: s['type'],
                    answer: '',
                    audiofileurl: '',
                    emotion: '',
                    audiototext: '',
                    timeTaken: '',
                    title: s['title'],
                    content: s['content'],
                })),
            };
        }));
        console.log(ans);
        const sub = this.submissionModel.create({
            testId: createSubmissionDto.testId,
            userId: createSubmissionDto.userId,
            answers: ans,
        });
        return sub;
    }
    async saveAnswer({ id, index, type, answer, time, emotion }) {
        const qs = await this.submissionModel.findById(id);
        if (!qs) {
            return new common_1.NotFoundException("Submission Not Found");
        }
        const sbarray = qs?.answers;
        if (Number(index) >= sbarray.length) {
            return new common_1.BadRequestException("ques index exceeded - " + index);
        }
        const obj = sbarray[Number(index)];
        const tps = obj["subQ"]?.map(et => {
            if (et.type == type) {
                const e = et;
                e["answer"] = answer;
                e["timeTaken"] = time;
                e["emotion"] = emotion;
                return e;
            }
            return et;
        });
        obj["subQ"] = tps;
        sbarray[Number(index)] = obj;
        console.log("sbarray: ", sbarray);
        const p = await this.submissionModel.findOneAndUpdate(qs._id, {
            answers: sbarray
        }, { new: true });
        const job = await this.audioQueue.add('text-emotion', { id, emotion, time, index });
        console.log(job);
        return p;
    }
    async saveAudio({ id, index, type, audiofile, audiotext }) {
        const qs = await this.submissionModel.findById(id);
        if (!qs) {
            return new common_1.NotFoundException("Submission Not Found");
        }
        const sbarray = qs?.answers;
        if (Number(index) >= sbarray.length) {
            return new common_1.BadRequestException("ques index exceeded - " + index);
        }
        const obj = sbarray[Number(index)];
        const tps = obj["subQ"]?.map(et => {
            if (et.type == type) {
                const e = et;
                e["audiofileurl"] = audiofile;
                e["audiototext"] = audiotext;
                return e;
            }
            return et;
        });
        obj["subQ"] = tps;
        sbarray[Number(index)] = obj;
        console.log("sbarray: ", sbarray);
        const p = await this.submissionModel.findOneAndUpdate(qs._id, {
            answers: sbarray
        }, { new: true });
        return p;
    }
    async saveAudioTrans({ id, index, type, audiotext }) {
        const qs = await this.submissionModel.findById(id);
        if (!qs) {
            return new common_1.NotFoundException("Submission Not Found");
        }
        const sbarray = qs?.answers;
        if (Number(index) >= sbarray.length) {
            return new common_1.BadRequestException("ques index exceeded - " + index);
        }
        const obj = sbarray[Number(index)];
        const tps = obj["subQ"]?.map(et => {
            if (et.type == type) {
                const e = et;
                e["audiototext"] = audiotext;
                return e;
            }
            return et;
        });
        obj["subQ"] = tps;
        sbarray[Number(index)] = obj;
        console.log("sbarray: ", sbarray);
        const p = await this.submissionModel.findOneAndUpdate(qs._id, {
            answers: sbarray
        }, { new: true });
        return { "message": "success", data: p._id };
    }
    async findbyindex(id, index, type) {
        const qs = await this.submissionModel.findById(id);
        const sbarray = qs?.answers;
        const obj = sbarray[Number(index)];
        const tps = obj["subQ"];
        const subq = tps.filter((item) => item.type == type);
        return subq[0];
    }
    async submitTest(id) {
        const qs = await this.submissionModel.findByIdAndUpdate(id, {
            submitted: true
        });
        const job = await this.audioQueue.add('test-submitted', { id });
        return {
            id: qs?._id,
            message: "test submitted successfully ",
            status: "success",
            submitted: true,
        };
    }
    async evalTextSQ(id, testId, answer) {
        const sq = await this.subquestionModel.findOne({
            _id: id, testId
        });
        console.log(sq);
        console.log({ id, testId, answer });
        if (!sq) {
            return false;
        }
        if (sq.correctAnswer.trim() == answer.trim()) {
            return true;
        }
        return false;
    }
    async evalAudioSQ(id, testId, answer) {
    }
    async findAll(id) {
        const all = await this.submissionModel.find({
            userId: id
        }).sort({ createdAt: 1 });
        const testD = await Promise.all(all.map(async (item) => {
            const tes = await this.testModel.findById(item?.testId);
            return {
                ...item.toJSON(),
                title: tes.title,
                keywords: tes.keywords,
            };
        }));
        return testD;
    }
    async findAllT(id) {
        return await this.submissionModel.find({
            testId: id
        }).sort({ createdAt: 1 });
    }
    async findOne(id) {
        return await this.submissionModel.findById(id);
    }
    async update(id, updateSubmissionDto) {
        return `This action updates a #${id} submission`;
    }
    async remove(id) {
        return `This action removes a #${id} submission`;
    }
};
exports.SubmissionService = SubmissionService;
exports.SubmissionService = SubmissionService = SubmissionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(usersubmission_schema_1.UserSubmission.name)),
    __param(1, (0, mongoose_1.InjectModel)(testing_1.Test.name)),
    __param(2, (0, mongoose_1.InjectModel)(question_schema_1.Question.name)),
    __param(3, (0, mongoose_1.InjectModel)(subquestion_schema_1.SubQuestion.name)),
    __param(4, (0, bull_1.InjectQueue)('audio')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model, Object])
], SubmissionService);
//# sourceMappingURL=submission.service.js.map