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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const login_dto_1 = require("./dto/login.dto");
const auth_service_1 = require("./auth.service");
const local_guard_1 = require("./guards/local.guard");
const swagger_1 = require("@nestjs/swagger");
const create_instructor_dto_1 = require("../instructor/dto/create-instructor.dto");
const instructor_service_1 = require("../instructor/instructor.service");
const user_service_1 = require("../user/user.service");
const register_user_dto_1 = require("../user/dto/register-user.dto");
const google_oauth_guard_1 = require("./guards/google-oauth.guard");
const constants_1 = require("../utils/constants");
let AuthController = class AuthController {
    constructor(authService, instructorService, userService) {
        this.authService = authService;
        this.instructorService = instructorService;
        this.userService = userService;
    }
    async googleAuthCallbackS(req, res) {
        try {
            const token = await this.authService.oAuthLoginS(req.user);
            res.redirect(`${constants_1.FRONTEND_URLS}/oauth?token=${token.access_token}&s_user=${JSON.stringify(token?.user)}`);
        }
        catch (err) {
            res.status(500).send({ success: false, message: err.message });
        }
    }
    async googleAuthCallback(req, res) {
        try {
            const token = await this.authService.oAuthLogin(req.user);
            if (token?.user?.role == "STUDENT") {
                res.redirect(`${constants_1.FRONTEND_URLS}/oauth?token=${token.access_token}&s_user=${JSON.stringify(token?.user)}`);
                return;
            }
            res.redirect(`${constants_1.FRONTEND_URL}/oauth?token=${token.access_token}&i_user=${JSON.stringify(token?.user)}`);
        }
        catch (err) {
            res.status(500).send({ success: false, message: err.message });
        }
    }
    async checkiemail(email) {
        const e = await this.instructorService.getPassByEmail(email?.email);
        const u = await this.userService.getPassByEmail(email?.email);
        if (!e && !u) {
            return false;
        }
        return true;
    }
    async checkRoll(roll) {
        const e = await this.userService.getPassByRoll(roll?.roll);
        if (!e) {
            return false;
        }
        return true;
    }
    async Registeri(CreateInstructorDto) {
        CreateInstructorDto["type"] = "CRED";
        return await this.instructorService.registerInstructor(CreateInstructorDto);
    }
    async Registers(RegisterUserDto) {
        RegisterUserDto["type"] = "CRED";
        return await this.userService.registerUser(RegisterUserDto);
    }
    async Slogin(data, req) {
        console.log(req.user);
        return await this.authService.slogin(req?.user);
    }
    async Ilogin(data, req) {
        const token = await this.authService.ilogin(req?.user);
        console.log(":::::", token);
        return token;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('callback/google/user'),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOauthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallbackS", null);
__decorate([
    (0, common_1.Get)('callback/google'),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOauthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallback", null);
__decorate([
    (0, common_1.Post)('check-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkiemail", null);
__decorate([
    (0, common_1.Post)('check-roll'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkRoll", null);
__decorate([
    (0, common_1.Post)('iregister'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_instructor_dto_1.CreateInstructorDtoI]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Registeri", null);
__decorate([
    (0, common_1.Post)('sregister'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Registers", null);
__decorate([
    (0, common_1.UseGuards)(local_guard_1.slocalAuthGuard),
    (0, common_1.Post)('/slogin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.sLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Slogin", null);
__decorate([
    (0, common_1.UseGuards)(local_guard_1.ilocalAuthGuard),
    (0, common_1.Post)('/ilogin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.iLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Ilogin", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        instructor_service_1.InstructorService,
        user_service_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map