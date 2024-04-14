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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioProcessor = void 0;
const upload_service_1 = require("./upload/upload.service");
const bull_1 = require("@nestjs/bull");
const evaluation_service_1 = require("./evaluation/evaluation.service");
const axios_1 = require("axios");
const FormData = require("form-data");
const node_buffer_1 = require("node:buffer");
function default_1(job, cb) {
    console.log(`[${process.pid}] ${JSON.stringify(job.data)}`);
    cb(null, 'It works');
}
exports.default = default_1;
let AudioProcessor = class AudioProcessor {
    constructor(evaluationService, uploadService) {
        this.evaluationService = evaluationService;
        this.uploadService = uploadService;
    }
    async getAudioEmotion(job) {
        const { id, audiofileurl, index } = job.data;
        const data = await this.uploadService.downloadFileFromSupabase(audiofileurl.slice(6));
        try {
            const formData = new FormData();
            const buf = await data.arrayBuffer();
            formData.append("file", node_buffer_1.Buffer.from(buf), {
                filename: "audio.wav",
            });
            const apiResult = await axios_1.default.post(process.env.SER_ENDPOINT, formData);
            const updateEvaluationDto = {
                audioEmotion: apiResult?.data?.emotion
            };
            const p = await this.evaluationService.updateBySubId(id, index, updateEvaluationDto);
            console.log("Evaluation Of Audio Updated");
        }
        catch (error) {
            console.error('Failed to predict audio emotion or update evaluation:', error);
            throw error;
        }
    }
    async saveTextemotion(job) {
        const { id, emotion, time, index } = job.data;
        try {
            const updateEvaluationDto = {
                videoEmotion: emotion,
                time
            };
            const p = await this.evaluationService.updateBySubId(id, index, updateEvaluationDto);
            console.log("Evaluation Of Audio Updated");
        }
        catch (error) {
            console.error('Failed to predict audio emotion or update evaluation:', error);
        }
    }
    async testSubmitted(job) {
        const { id } = job.data;
        try {
            const p = await this.evaluationService.evalTest(id);
            console.log("Evaluation Of Test", p);
        }
        catch (error) {
            console.error('Failed to Evaluate Test:', error);
        }
    }
};
exports.AudioProcessor = AudioProcessor;
__decorate([
    (0, bull_1.Process)('audio-emotion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AudioProcessor.prototype, "getAudioEmotion", null);
__decorate([
    (0, bull_1.Process)('text-emotion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AudioProcessor.prototype, "saveTextemotion", null);
__decorate([
    (0, bull_1.Process)('test-submitted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AudioProcessor.prototype, "testSubmitted", null);
exports.AudioProcessor = AudioProcessor = __decorate([
    (0, bull_1.Processor)('audio'),
    __metadata("design:paramtypes", [evaluation_service_1.EvaluationService,
        upload_service_1.UploadService])
], AudioProcessor);
//# sourceMappingURL=app.processor.js.map