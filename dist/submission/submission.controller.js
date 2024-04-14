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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionController = void 0;
const common_1 = require("@nestjs/common");
const submission_service_1 = require("./submission.service");
const create_submission_dto_1 = require("./dto/create-submission.dto");
const update_submission_dto_1 = require("./dto/update-submission.dto");
const swagger_1 = require("@nestjs/swagger");
const save_text_submission_dto_1 = require("./dto/save-text-submission.dto");
const evaluation_service_1 = require("../evaluation/evaluation.service");
const submission_interceptor_1 = require("./submission.interceptor");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let SubmissionController = class SubmissionController {
    constructor(submissionService, evaluationService) {
        this.submissionService = submissionService;
        this.evaluationService = evaluationService;
    }
    async create(createSubmissionDto) {
        const sub = await this.submissionService.create(createSubmissionDto);
        const _ = await this.evaluationService.create({ submissionId: sub._id, ...createSubmissionDto });
        return sub;
    }
    async updatetext(saveTextSubmissionDto) {
        return await this.submissionService.saveAnswer(saveTextSubmissionDto);
    }
    async updateaudio(saveAudioSubmissionDto) {
        return await this.submissionService.saveAudio(saveAudioSubmissionDto);
    }
    async submitTest(id) {
        return await this.submissionService.submitTest(id);
    }
    async findAll(req) {
        const user = req?.user;
        return await this.submissionService.findAll(user?.id);
    }
    async findAllT(id) {
        return await this.submissionService.findAll(id);
    }
    async findOne(id) {
        return await this.submissionService.findOne(id);
    }
    async update(id, updateSubmissionDto) {
        return await this.submissionService.update(id, updateSubmissionDto);
    }
    async remove(id) {
        return await this.submissionService.remove(id);
    }
};
exports.SubmissionController = SubmissionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_submission_dto_1.CreateSubmissionDto]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('text'),
    (0, common_1.UseInterceptors)(submission_interceptor_1.SubmissionInterceptor),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [save_text_submission_dto_1.SaveTextSubmissionDto]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "updatetext", null);
__decorate([
    (0, common_1.Post)('audio'),
    (0, common_1.UseInterceptors)(submission_interceptor_1.SubmissionInterceptor),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [save_text_submission_dto_1.SaveAudioSubmissionDto]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "updateaudio", null);
__decorate([
    (0, common_1.Post)('test/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "submitTest", null);
__decorate([
    (0, common_1.Get)('user/mytests'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('all/:testId'),
    __param(0, (0, common_1.Param)('testId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "findAllT", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)(submission_interceptor_1.SubmissionInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_submission_dto_1.UpdateSubmissionDto]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "remove", null);
exports.SubmissionController = SubmissionController = __decorate([
    (0, common_1.Controller)('submission'),
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.UseGuards)(jwt_guard_1.StudentAuthGuard),
    __metadata("design:paramtypes", [submission_service_1.SubmissionService,
        evaluation_service_1.EvaluationService])
], SubmissionController);
//# sourceMappingURL=submission.controller.js.map