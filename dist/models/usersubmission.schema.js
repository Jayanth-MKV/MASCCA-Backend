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
exports.UserSubmissionSchema = exports.UserSubmission = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserSubmission = class UserSubmission {
};
exports.UserSubmission = UserSubmission;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.SchemaTypes.ObjectId, ref: 'Test' }),
    __metadata("design:type", String)
], UserSubmission.prototype, "testId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.SchemaTypes.ObjectId, ref: 'User' }),
    __metadata("design:type", String)
], UserSubmission.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], UserSubmission.prototype, "submitted", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        name: "answers",
        type: mongoose_2.SchemaTypes.Array,
        default: [
            {
                qid: { type: mongoose_2.SchemaTypes.ObjectId, ref: 'Question' },
                topic: { type: String },
                content: { type: String },
                subQ: {
                    name: "subQ",
                    type: mongoose_2.SchemaTypes.Array,
                    default: [
                        {
                            sqid: { type: mongoose_2.SchemaTypes.ObjectId, ref: 'SubQuestion' },
                            type: String,
                            answer: String,
                            emotion: String,
                            audiofileurl: String,
                            audiototext: String,
                            timeTaken: String,
                            title: String,
                            content: String,
                        },
                    ],
                }
            },
        ]
    }),
    __metadata("design:type", Array)
], UserSubmission.prototype, "answers", void 0);
exports.UserSubmission = UserSubmission = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], UserSubmission);
exports.UserSubmissionSchema = mongoose_1.SchemaFactory.createForClass(UserSubmission);
//# sourceMappingURL=usersubmission.schema.js.map