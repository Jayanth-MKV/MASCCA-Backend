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
exports.EvaluationController = void 0;
const common_1 = require("@nestjs/common");
const evaluation_service_1 = require("./evaluation.service");
const create_evaluation_dto_1 = require("./dto/create-evaluation.dto");
let EvaluationController = class EvaluationController {
    constructor(evaluationService) {
        this.evaluationService = evaluationService;
    }
    create(createEvaluationDto) {
        return this.evaluationService.create(createEvaluationDto);
    }
    async getAudiEmo(data) {
        let index = data?.index;
        return await this.evaluationService.getAudioEmotion(data.id, index);
    }
    async gettextEmo(data) {
        let index = data?.index;
        return await this.evaluationService.EvalTextemotion(data.id, index);
    }
    async testReval(id) {
        return await this.evaluationService.evalTest(id);
    }
    async findOnebysubId(id) {
        return await this.evaluationService.findOneSubId(id);
    }
    async findOneId(id) {
        return await this.evaluationService.findOne(id);
    }
    async findOnetId(id) {
        return await this.evaluationService.findAll(id);
    }
    async getResults(id) {
        return await this.evaluationService.getResults(id);
    }
    async getResultsReload(id) {
        return await this.evaluationService.getResults(id, true);
    }
    async findAllIns(id) {
        return await this.evaluationService.findAll(id);
    }
};
exports.EvaluationController = EvaluationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_evaluation_dto_1.CreateEvaluationDto]),
    __metadata("design:returntype", void 0)
], EvaluationController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('audio/reload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_evaluation_dto_1.AudioReEvaluationDto]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "getAudiEmo", null);
__decorate([
    (0, common_1.Post)('text/reload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_evaluation_dto_1.TextReEvaluationDto]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "gettextEmo", null);
__decorate([
    (0, common_1.Get)('submission/:id/test/reload'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "testReval", null);
__decorate([
    (0, common_1.Get)('getbysubid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "findOnebysubId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "findOneId", null);
__decorate([
    (0, common_1.Get)('test/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "findOnetId", null);
__decorate([
    (0, common_1.Get)('submission/:id/results'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "getResults", null);
__decorate([
    (0, common_1.Get)('submission/:id/results/reload'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "getResultsReload", null);
__decorate([
    (0, common_1.Get)('test/inst/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "findAllIns", null);
exports.EvaluationController = EvaluationController = __decorate([
    (0, common_1.Controller)('evaluation'),
    __metadata("design:paramtypes", [evaluation_service_1.EvaluationService])
], EvaluationController);
//# sourceMappingURL=evaluation.controller.js.map