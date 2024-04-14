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
exports.InstructorJWTStrategy = exports.StudentJWTStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_jwt_1 = require("passport-jwt");
let StudentJWTStrategy = class StudentJWTStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'student') {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
        console.log("inside student strategy");
    }
    async validate(payload) {
        console.log("inside student validate");
        console.log(payload);
        return {
            id: payload?.id,
            roll: payload?.roll,
            role: payload?.role
        };
    }
};
exports.StudentJWTStrategy = StudentJWTStrategy;
exports.StudentJWTStrategy = StudentJWTStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StudentJWTStrategy);
let InstructorJWTStrategy = class InstructorJWTStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'instructor') {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }
    async validate(payload) {
        console.log(payload);
        return {
            id: payload?.id,
            email: payload?.email,
            role: payload?.role
        };
    }
};
exports.InstructorJWTStrategy = InstructorJWTStrategy;
exports.InstructorJWTStrategy = InstructorJWTStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], InstructorJWTStrategy);
//# sourceMappingURL=jwt.strategy.js.map