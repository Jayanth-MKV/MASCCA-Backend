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
exports.SubQuestionSchema = exports.SubQuestion = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SubQuestion = class SubQuestion {
};
exports.SubQuestion = SubQuestion;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Test', required: true }),
    __metadata("design:type", String)
], SubQuestion.prototype, "testId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Question', required: true }),
    __metadata("design:type", String)
], SubQuestion.prototype, "questionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Instructor', required: true }),
    __metadata("design:type", String)
], SubQuestion.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'SubQuestion Title' }),
    __metadata("design:type", String)
], SubQuestion.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Sub Question content' }),
    __metadata("design:type", String)
], SubQuestion.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['AUDIO', 'TEXT'] }),
    __metadata("design:type", String)
], SubQuestion.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SubQuestion.prototype, "powerReference", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SubQuestion.prototype, "correctAnswer", void 0);
exports.SubQuestion = SubQuestion = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SubQuestion);
exports.SubQuestionSchema = mongoose_1.SchemaFactory.createForClass(SubQuestion);
//# sourceMappingURL=subquestion.schema.js.map