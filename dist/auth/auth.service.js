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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const hash_service_1 = require("../hash/hash.service");
const instructor_service_1 = require("../instructor/instructor.service");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, instructorService, hashService, jwtService) {
        this.userService = userService;
        this.instructorService = instructorService;
        this.hashService = hashService;
        this.jwtService = jwtService;
    }
    async oAuthLogin(user) {
        if (!user) {
            throw new Error('User not found!!!');
        }
        const U = await this.oAuthLoginS(user);
        if (U && U.access_token) {
            return U;
        }
        const Instructor = await this.instructorService.findByEmail(user.email);
        let id = Instructor._id;
        if (!Instructor) {
            const inst = await this.instructorService.registerInstructor({
                name: user.name,
                email: user.email,
                department: "NULL",
                password: "",
                type: "GOOGLE"
            });
            id = inst?.user?.id;
        }
        const payload = {
            email: user.email,
            id: id,
            name: user.name,
            role: 'INSTRUCTOR',
            profile: user?.picture
        };
        const jwt = this.jwtService.sign(payload);
        return {
            access_token: jwt,
            user: payload
        };
    }
    async oAuthLoginS(user) {
        if (!user) {
            throw new Error('User not found!!!');
        }
        const User = await this.userService.findByEmail(user.email);
        if (!User) {
            return null;
        }
        let id = User._id;
        const payload = {
            email: user.email,
            id: id,
            name: user.name,
            role: 'STUDENT',
            profile: user?.picture
        };
        const jwt = this.jwtService.sign(payload);
        return {
            access_token: jwt,
            user: payload
        };
    }
    async validateUser(roll, pass) {
        const user = await this.userService.getPassByRoll(roll);
        if (user && (await this.hashService.comparePassword(pass, user.password))) {
            return user;
        }
        return null;
    }
    async validateIns(email, pass) {
        const user = await this.instructorService.getPassByEmail(email);
        if (user && (await this.hashService.comparePassword(pass, user.password))) {
            return user;
        }
        return null;
    }
    async slogin(user) {
        const payload = {
            id: user._id,
            roll: user.roll,
            email: user.email,
            role: 'STUDENT',
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: payload
        };
    }
    async ilogin(user) {
        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: 'INSTRUCTOR',
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: payload
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        instructor_service_1.InstructorService,
        hash_service_1.HashService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map