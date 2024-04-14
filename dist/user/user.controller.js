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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const upload_service_1 = require("../upload/upload.service");
const platform_express_1 = require("@nestjs/platform-express");
const storage_object_dto_1 = require("../upload/dto/storage-object.dto");
const submission_service_1 = require("../submission/submission.service");
const getAudio_Dto_1 = require("./dto/getAudio.Dto");
let UserController = class UserController {
    constructor(userService, uploadService, submissionService) {
        this.userService = userService;
        this.uploadService = uploadService;
        this.submissionService = submissionService;
    }
    async uploadTrans(index, id, text) {
        const ts = await this.submissionService.saveAudioTrans({ id, type: "AUDIO", index, audiotext: text });
        console.log(ts);
        return ts;
    }
    async uploadFile(folder, index, id, data, file) {
        if (!file) {
            return new common_1.BadGatewayException("file not provided");
        }
        const uploadedData = await this.uploadService.uploadFileToSupabase(file, folder, index, id);
        console.log(data);
        if (!uploadedData || !uploadedData?.fullPath) {
            return new common_1.BadGatewayException("file not uploaded");
        }
        const sa = await this.submissionService.saveAudio({ id: id, index, type: "AUDIO", audiofile: uploadedData?.fullPath, audiotext: data.text });
        return sa;
    }
    getAudio(getaudDto) {
        return this.uploadService.downloadFileFromSupabase(getaudDto.filePath);
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    findAll() {
        return this.userService.findAll();
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    update(id, updateUserDto) {
        return this.userService.update(id, updateUserDto);
    }
    remove(id) {
        return this.userService.remove(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('submit/audio/transcript/:index/:id'),
    __param(0, (0, common_1.Param)('index')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadTrans", null);
__decorate([
    (0, common_1.Post)('submit/audio/:testid/:index/:id'),
    (0, swagger_1.ApiParam)({
        name: 'testid',
        description: 'folder name - Test ID',
        type: 'string',
        schema: {
            example: '123-123-123-123',
        },
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('testid')),
    __param(1, (0, common_1.Param)('index')),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: /\**.(wav|mp3|aiff|ogg)$/ }),
        ],
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, storage_object_dto_1.StorageObjectDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('/getaudiofile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getAudio_Dto_1.getAudioDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAudio", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('user'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        upload_service_1.UploadService,
        submission_service_1.SubmissionService])
], UserController);
//# sourceMappingURL=user.controller.js.map