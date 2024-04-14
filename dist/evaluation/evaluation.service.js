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
var EvaluationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const testevaluation_schema_1 = require("../models/testevaluation.schema");
const mongoose_2 = require("mongoose");
const submission_service_1 = require("../submission/submission.service");
const upload_service_1 = require("../upload/upload.service");
const axios_1 = require("axios");
const FormData = require("form-data");
let EvaluationService = EvaluationService_1 = class EvaluationService {
    constructor(evaluationModel, submissionService, uploadService) {
        this.evaluationModel = evaluationModel;
        this.submissionService = submissionService;
        this.uploadService = uploadService;
        this.logger = new common_1.Logger(EvaluationService_1.name);
    }
    async EvalTextemotion(id, index) {
        const subq = await this.submissionService.findbyindex(id, index, "TEXT");
        let emotion, time;
        if (subq) {
            emotion = subq?.emotion || "neutral";
            time = subq?.timeTaken;
        }
        try {
            const updateEvaluationDto = {
                videoEmotion: emotion,
                time
            };
            const p = await this.updateBySubId(id, Number(index), updateEvaluationDto);
            console.log("Evaluation Of Audio Updated");
            return p;
        }
        catch (error) {
            console.error('Failed to predict audio emotion or update evaluation:', error);
        }
    }
    async getAudioEmotion(id, index) {
        const subq = await this.submissionService.findbyindex(id, index, "AUDIO");
        let audiofileurl;
        if (subq) {
            audiofileurl = subq?.audiofileurl;
        }
        const data = await this.uploadService.downloadFileFromSupabase(audiofileurl.slice(6));
        try {
            const formData = new FormData();
            const buf = await data.arrayBuffer();
            formData.append("file", Buffer.from(buf), {
                filename: "audio.wav",
            });
            const apiResult = await axios_1.default.post(process.env.SER_ENDPOINT, formData);
            const updateEvaluationDto = {
                audioEmotion: apiResult?.data?.emotion
            };
            const p = await this.updateBySubId(id, Number(index), updateEvaluationDto);
            console.log("Evaluation Of Audio Updated");
            return p;
        }
        catch (error) {
            console.error('Failed to predict audio emotion or update evaluation:', error);
            throw error;
        }
    }
    async create(createEvaluationDto) {
        const existingtest = await this.evaluationModel.findOne({
            testId: createEvaluationDto.testId,
            userId: createEvaluationDto.userId,
            submissionId: createEvaluationDto.submissionId,
        });
        if (existingtest) {
            return existingtest;
        }
        const subm = await this.submissionService.findOne(createEvaluationDto.submissionId.toString());
        const answers = subm?.answers;
        const resu = answers.map((q) => {
            return {
                question_confidence: "",
                correctAnswer: "",
                audioEmotion: "",
                videoEmotion: "",
                audiotextRelevancy: "",
                time: "",
            };
        });
        console.log(resu);
        const sub = this.evaluationModel.create({
            testId: createEvaluationDto.testId,
            userId: createEvaluationDto.userId,
            submissionId: createEvaluationDto.submissionId,
            results: resu,
        });
        return sub;
    }
    async findAll(id) {
        return await this.evaluationModel.find({
            testId: id
        });
    }
    async findOne(id) {
        return await this.evaluationModel.findById(id);
    }
    async findOneSubId(id) {
        return await this.evaluationModel.findOne({
            submissionId: id
        });
    }
    async evalTest(id) {
        const sub = await this.submissionService.findOne(id);
        if (!sub) {
            return new common_1.NotFoundException("Submission Not Found");
        }
        const ev = await this.findOneSubId(id);
        if (!ev) {
            return new common_1.NotFoundException("Evaluation Not Found");
        }
        const results = ev.results;
        const answers = sub?.answers;
        if (!answers) {
            return;
        }
        for (const [idx, question] of answers.entries()) {
            const subq = question?.subQ;
            if (!subq) {
                continue;
            }
            const subquestionResults = await Promise.all(subq.map(async (subquestion) => {
                if (subquestion.type === "TEXT") {
                    const answer = await this.submissionService.evalTextSQ(subquestion.sqid, sub.testId, subquestion.answer);
                    return { correctAnswer: answer || false };
                }
                else if (subquestion.type === "AUDIO") {
                    return { audiotextRelevancy: 80 };
                }
                else {
                    throw new Error(`Unsupported subquestion type: ${subquestion.type}`);
                }
            }));
            results[idx] = { ...results[idx], ...Object.assign({}, ...subquestionResults) };
        }
        console.log(results);
        const p = await this.evaluationModel.findOneAndUpdate(ev._id, {
            results
        }, { new: true });
        return p;
    }
    async getResults(id, reload = false) {
        const submission = await this.findOneSubId(id);
        const testConf = submission.testConfidence;
        if (testConf && !reload) {
            return { testConfidence: submission.testConfidence, confidenceLevel: await this.getConfidenceLevel(parseInt(submission.testConfidence)), "questions": submission.results.map(i => i.question_confidence), "eval": submission };
        }
        const results = submission.results;
        const totalQuestions = results.length;
        let sumConfidence = 0;
        const rr = await Promise.all(results.map(async (question, idx) => {
            let correctAnswerConfidence = question.correctAnswer ? 100 : 0;
            let audioEmotion = await this.getEmotionValue(question.audioEmotion);
            let videoEmotion = await this.getEmotionValue(question.videoEmotion);
            let audiotextRelevancy = question.audiotextRelevancy;
            let timeTaken = parseInt(question?.time.toString());
            let timePercentage = ((timeTaken > 30) ? 60 - timeTaken / 60 : 1) * 100;
            const questionConfidence = (correctAnswerConfidence * 0.3) + (audioEmotion * 0.2) + (videoEmotion * 0.2) +
                (audiotextRelevancy * 0.2) +
                (timePercentage * 0.1);
            console.log({
                correctAnswerConfidence, audioEmotion, videoEmotion, audiotextRelevancy, timePercentage, questionConfidence
            });
            const l = await this.updateBySubId(id, idx, {
                question_confidence: questionConfidence / 100,
                correctAnswer: question.correctAnswer,
                audioEmotion: question.audioEmotion,
                videoEmotion: question.videoEmotion,
                audiotextRelevancy: question.audiotextRelevancy,
                time: question.time.toString()
            });
            sumConfidence += questionConfidence;
            return questionConfidence;
        }));
        console.log(rr);
        const testConfidence = (sumConfidence / totalQuestions);
        const evs = await this.evaluationModel.findOneAndUpdate({
            submissionId: id
        }, {
            testConfidence
        }, {
            new: true
        });
        const confidenceLevel = await this.getConfidenceLevel(testConfidence);
        return { testConfidence, confidenceLevel, "questions": rr, "eval": evs };
    }
    async getEmotionValue(emotion) {
        switch (emotion) {
            case 'happy':
                return 100;
            case 'neutral':
                return 50;
            case 'sad':
                return 0;
            default:
                return 20;
        }
    }
    async getConfidenceLevel(testConfidence) {
        let confidenceLevel = '';
        if (testConfidence <= 60) {
            confidenceLevel = 'LOW';
        }
        else if (testConfidence <= 80) {
            confidenceLevel = 'MEDIUM';
        }
        else {
            confidenceLevel = 'HIGH';
        }
        return confidenceLevel;
    }
    async updateById(id, updateEvaluationDto) {
        return await this.evaluationModel.updateOne({
            submissionId: id
        }, updateEvaluationDto);
    }
    async updateBySubId(id, index, updateEvaluationDto) {
        let em = null;
        em = await this.evaluationModel.findOne({
            submissionId: id
        });
        if (!em) {
            const emq = await this.submissionService.findOne(id);
            if (!emq) {
                return new common_1.NotFoundException("Submission Not Found");
            }
            em = await this.create({ submissionId: id, testId: emq.testId, userId: emq.userId });
        }
        const res = em?.results || [];
        if (Number(index) >= res.length) {
            return new common_1.BadRequestException("ques index exceeded - " + index);
        }
        res[index] = {
            ...res[index],
            ...updateEvaluationDto
        };
        const p = await this.evaluationModel.findOneAndUpdate(em._id, {
            results: res
        }, { new: true });
        return p;
    }
    async remove(id) {
        return `This action removes a #${id} evaluation`;
    }
};
exports.EvaluationService = EvaluationService;
exports.EvaluationService = EvaluationService = EvaluationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(testevaluation_schema_1.TestEvaluation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        submission_service_1.SubmissionService,
        upload_service_1.UploadService])
], EvaluationService);
//# sourceMappingURL=evaluation.service.js.map