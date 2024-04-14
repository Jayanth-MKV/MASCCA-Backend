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
exports.InstructorSchema = exports.Instructor = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var LoginType;
(function (LoginType) {
    LoginType[LoginType["CRED"] = 0] = "CRED";
    LoginType[LoginType["GOOGLE"] = 1] = "GOOGLE";
})(LoginType || (LoginType = {}));
let Instructor = class Instructor {
};
exports.Instructor = Instructor;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Instructor.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Instructor.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Instructor.prototype, "department", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Instructor.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Instructor.prototype, "profilePic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ lowercase: true, unique: true, required: true }),
    __metadata("design:type", String)
], Instructor.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ select: false, required: true }),
    __metadata("design:type", String)
], Instructor.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "CRED", uppercase: true, enum: LoginType }),
    __metadata("design:type", String)
], Instructor.prototype, "type", void 0);
exports.Instructor = Instructor = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Instructor);
exports.InstructorSchema = mongoose_1.SchemaFactory.createForClass(Instructor);
//# sourceMappingURL=instructor.schema.js.map