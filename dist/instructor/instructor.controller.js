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
exports.InstructorController = void 0;
const common_1 = require("@nestjs/common");
const instructor_service_1 = require("./instructor.service");
const create_instructor_dto_1 = require("./dto/create-instructor.dto");
const update_instructor_dto_1 = require("./dto/update-instructor.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const upload_service_1 = require("../upload/upload.service");
const mail_dto_1 = require("./dto/mail.dto");
let InstructorController = class InstructorController {
    constructor(instructorService, uploadService) {
        this.instructorService = instructorService;
        this.uploadService = uploadService;
    }
    async deleteFolder(folderName) {
        return await this.uploadService.deleteFolderInSupabase(folderName);
    }
    sendEmail(MailDto) {
        return this.instructorService.sendInviteEmail(MailDto);
    }
    sendEmails(MultiMailDto) {
        return this.instructorService.sendMultipleInviteEmails(MultiMailDto);
    }
    create(createInstructorDto) {
        return this.instructorService.create(createInstructorDto);
    }
    findAll() {
        return this.instructorService.findAll();
    }
    findOne(id) {
        return this.instructorService.findOne(id);
    }
    update(id, updateInstructorDto) {
        return this.instructorService.update(id, updateInstructorDto);
    }
    remove(id) {
        return this.instructorService.remove(id);
    }
};
exports.InstructorController = InstructorController;
__decorate([
    (0, common_1.Delete)('test/:folderName'),
    __param(0, (0, common_1.Param)('folderName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "deleteFolder", null);
__decorate([
    (0, common_1.Post)('sendinviteemail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mail_dto_1.MailDto]),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Post)('sendinviteemails'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "sendEmails", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_instructor_dto_1.CreateInstructorDto]),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_instructor_dto_1.UpdateInstructorDto]),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "remove", null);
exports.InstructorController = InstructorController = __decorate([
    (0, common_1.Controller)('instructor'),
    (0, swagger_1.ApiTags)('instructor'),
    (0, common_1.UseGuards)(jwt_guard_1.InstructorAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [instructor_service_1.InstructorService,
        upload_service_1.UploadService])
], InstructorController);
//# sourceMappingURL=instructor.controller.js.map