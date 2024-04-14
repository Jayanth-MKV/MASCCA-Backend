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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const create_question_dto_1 = require("./dto/create-question.dto");
const update_question_dto_1 = require("./dto/update-question.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async create(createQuestionDto, req) {
        const id = req?.user?.id;
        return await this.questionService.createFiveQuestions(createQuestionDto, id);
    }
    async findAllI(id) {
        return await this.questionService.findAll(id);
    }
    async findAllU(id) {
        return await this.questionService.findAll(id);
    }
    async findOneI(id, req) {
        const user = req?.user;
        return await this.questionService.findOneI(id, user?.id);
    }
    async update(id, updateQuestionDto) {
        return await this.questionService.update(id, updateQuestionDto);
    }
    async remove(id) {
        return await this.questionService.remove(id);
    }
};
exports.QuestionController = QuestionController;
__decorate([
    (0, common_1.Post)('fivequestions'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_dto_1.CreateQuestionDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all/:testid'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Param)('testid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "findAllI", null);
__decorate([
    (0, common_1.Get)(':testid'),
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.UseGuards)(jwt_guard_1.StudentAuthGuard),
    __param(0, (0, common_1.Param)('testid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "findAllU", null);
__decorate([
    (0, common_1.Get)('instructor/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "findOneI", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_question_dto_1.UpdateQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "remove", null);
exports.QuestionController = QuestionController = __decorate([
    (0, common_1.Controller)('question'),
    (0, swagger_1.ApiTags)('instructor'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
//# sourceMappingURL=question.controller.js.map