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
exports.InstructorAuthGuard = exports.StudentAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let StudentAuthGuard = class StudentAuthGuard extends (0, passport_1.AuthGuard)('student') {
    constructor() {
        console.log("inside student auth guard");
        super();
    }
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(err, user) {
        if (err || !user) {
            throw err || new common_1.UnauthorizedException();
        }
        if (user.role !== 'STUDENT') {
            throw new common_1.UnauthorizedException('You do not have permission to access this resource.');
        }
        console.log(user);
        return user;
    }
};
exports.StudentAuthGuard = StudentAuthGuard;
exports.StudentAuthGuard = StudentAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StudentAuthGuard);
let InstructorAuthGuard = class InstructorAuthGuard extends (0, passport_1.AuthGuard)('instructor') {
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(err, user) {
        if (err || !user) {
            throw err || new common_1.UnauthorizedException();
        }
        if (user.role !== 'INSTRUCTOR') {
            throw new common_1.UnauthorizedException('You do not have permission to access this resource.');
        }
        return user;
    }
};
exports.InstructorAuthGuard = InstructorAuthGuard;
exports.InstructorAuthGuard = InstructorAuthGuard = __decorate([
    (0, common_1.Injectable)()
], InstructorAuthGuard);
//# sourceMappingURL=jwt.guard.js.map