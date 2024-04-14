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
exports.TestController = void 0;
const common_1 = require("@nestjs/common");
const test_service_1 = require("./test.service");
const create_test_dto_1 = require("./dto/create-test.dto");
const update_test_dto_1 = require("./dto/update-test.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let TestController = class TestController {
    constructor(testService) {
        this.testService = testService;
    }
    async create(createTestDto, req) {
        const id = req?.user?.id;
        return await this.testService.create(createTestDto, id);
    }
    async getInviteLink(id) {
        return await this.testService.createInviteLink(id);
    }
    async getByIdAndSecret(getTestDto) {
        console.log("take test");
        console.log(getTestDto);
        return await this.testService.getByIdAndSecret(getTestDto.id, getTestDto.testSecret);
    }
    async findAll(req) {
        const user = req?.user;
        return await this.testService.findAll(user?.id);
    }
    async findAllAv() {
        return await this.testService.findAllAvailable();
    }
    async findAllOngoing(req) {
        const user = req?.user;
        return await this.testService.findAllOng(user?.id);
    }
    async findOneU(id) {
        const u = await this.testService.findOneU(id);
        return u;
    }
    findOneI(id, req) {
        const user = req?.user;
        return this.testService.findOneI(id, user?.id);
    }
    update(id, updateTestDto) {
        console.log(updateTestDto);
        return this.testService.update(id, updateTestDto);
    }
    publishTest(id, updatePubDto) {
        console.log(id);
        console.log(updatePubDto);
        return this.testService.publishTest(id, updatePubDto);
    }
    remove(id) {
        return this.testService.remove(id);
    }
};
exports.TestController = TestController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_test_dto_1.CreateTestDto, Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('invitelink/:testid'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Param)('testid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getInviteLink", null);
__decorate([
    (0, common_1.Post)('taketest'),
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.UseGuards)(jwt_guard_1.StudentAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getByIdAndSecret", null);
__decorate([
    (0, common_1.Get)('instructor/mytests'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(jwt_guard_1.StudentAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestController.prototype, "findAllAv", null);
__decorate([
    (0, common_1.Get)('instructor/mytests/ongoing'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "findAllOngoing", null);
__decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Get)('user/:testid'),
    (0, common_1.UseGuards)(jwt_guard_1.StudentAuthGuard),
    __param(0, (0, common_1.Param)('testid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "findOneU", null);
__decorate([
    (0, common_1.Get)('instructor/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "findOneI", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_test_dto_1.UpdateTestDto]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('publish/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_test_dto_1.updatePubDto]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "publishTest", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "remove", null);
exports.TestController = TestController = __decorate([
    (0, common_1.Controller)('test'),
    (0, swagger_1.ApiTags)('instructor'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [test_service_1.TestService])
], TestController);
//# sourceMappingURL=test.controller.js.map