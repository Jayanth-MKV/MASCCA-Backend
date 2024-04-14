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
exports.iLocalStrategy = exports.sLocalStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const auth_service_1 = require("../auth.service");
let sLocalStrategy = class sLocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy, 'slocal') {
    constructor(authService) {
        super({
            usernameField: 'roll',
            passwordField: 'password',
        });
        this.authService = authService;
        console.log('load slocal strategy');
    }
    async validate(roll, password) {
        const user = await this.authService.validateUser(roll, password);
        if (!user) {
            throw new common_1.UnauthorizedException({
                message: 'You have entered a wrong roll or password',
            });
        }
        return user;
    }
};
exports.sLocalStrategy = sLocalStrategy;
exports.sLocalStrategy = sLocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_service_1.AuthService)),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], sLocalStrategy);
let iLocalStrategy = class iLocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy, 'ilocal') {
    constructor(authService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
        this.authService = authService;
        console.log('load ilocal strategy');
    }
    async validate(email, password) {
        console.log('load ilocal validate');
        const user = await this.authService.validateIns(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException({
                message: 'You have entered a wrong email or password',
            });
        }
        return user;
    }
};
exports.iLocalStrategy = iLocalStrategy;
exports.iLocalStrategy = iLocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_service_1.AuthService)),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], iLocalStrategy);
//# sourceMappingURL=local-strategy.js.map