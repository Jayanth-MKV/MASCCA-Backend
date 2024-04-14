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
exports.SubQuestionController = void 0;
const common_1 = require("@nestjs/common");
const sub_question_service_1 = require("./sub-question.service");
const update_sub_question_dto_1 = require("./dto/update-sub-question.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let SubQuestionController = class SubQuestionController {
    constructor(subQuestionService) {
        this.subQuestionService = subQuestionService;
    }
    findAll(id) {
        return this.subQuestionService.findAll(id);
    }
    async findOneU(id) {
        return await this.subQuestionService.findOneU(id);
    }
    findOneI(id, req) {
        const user = req?.user;
        return this.subQuestionService.findOneI(id, user?.id);
    }
    update(id, updateSubQuestionDto) {
        return this.subQuestionService.update(id, updateSubQuestionDto);
    }
    remove(id) {
        return this.subQuestionService.remove(id);
    }
};
exports.SubQuestionController = SubQuestionController;
__decorate([
    (0, common_1.Get)(':questionid'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Param)('questionid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubQuestionController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Get)('user/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.StudentAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubQuestionController.prototype, "findOneU", null);
__decorate([
    (0, common_1.Get)('instructor/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    (0, swagger_1.ApiParam)({
        name: 'give question id to get sub questions',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", void 0)
], SubQuestionController.prototype, "findOneI", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sub_question_dto_1.UpdateSubQuestionDto]),
    __metadata("design:returntype", void 0)
], SubQuestionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubQuestionController.prototype, "remove", null);
exports.SubQuestionController = SubQuestionController = __decorate([
    (0, common_1.Controller)('subquestion'),
    (0, swagger_1.ApiTags)('instructor'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [sub_question_service_1.SubQuestionService])
], SubQuestionController);
//# sourceMappingURL=sub-question.controller.js.map