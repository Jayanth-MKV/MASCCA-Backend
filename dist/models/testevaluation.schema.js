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
exports.TestEvaluationSchema = exports.TestEvaluation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TestEvaluation = class TestEvaluation {
};
exports.TestEvaluation = TestEvaluation;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'UserSubmission', required: true }),
    __metadata("design:type", String)
], TestEvaluation.prototype, "submissionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Test', required: true }),
    __metadata("design:type", String)
], TestEvaluation.prototype, "testId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", String)
], TestEvaluation.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "" }),
    __metadata("design:type", String)
], TestEvaluation.prototype, "testConfidence", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        name: "results",
        type: mongoose_2.SchemaTypes.Array,
        default: [
            {
                question_confidence: Number,
                audioEmotion: String,
                videoEmotion: String,
                correctAnswer: Number,
                audiotextRelevancy: Number,
                time: String,
            }
        ],
    }),
    __metadata("design:type", Array)
], TestEvaluation.prototype, "results", void 0);
exports.TestEvaluation = TestEvaluation = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], TestEvaluation);
exports.TestEvaluationSchema = mongoose_1.SchemaFactory.createForClass(TestEvaluation);
//# sourceMappingURL=testevaluation.schema.js.map