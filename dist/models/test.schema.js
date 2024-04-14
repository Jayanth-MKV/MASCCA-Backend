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
exports.TestSchema = exports.Test = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Test = class Test {
};
exports.Test = Test;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Test.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Test.prototype, "about", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "You have 15 minutes to complete the test. Once you begin, the timer will start and cannot be paused. Please make sure you have a stable internet connection.  " }),
    __metadata("design:type", String)
], Test.prototype, "instructions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Do not use any external resources.\nComplete the test individually.\nDo not refresh the page during the test." }),
    __metadata("design:type", String)
], Test.prototype, "guidelines", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "By participating in this test, you agree to the following terms and conditions:\n1. The test is conducted solely for educational and assessment purposes.\nAll questions and materials provided in the test are confidential and should not be shared with others.\n3. Any form of cheating or plagiarism is strictly prohibited.\n4. The test duration is limited, and once started, it cannot be paused or restarted.\n5. Participants must ensure a stable internet connection to avoid any disruptions during the test.\n6. The test results may be used for evaluation and feedback purposes.\nThank you for your cooperation.\n" }),
    __metadata("design:type", String)
], Test.prototype, "tandc", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Test.prototype, "testSecret", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.Array }),
    __metadata("design:type", Array)
], Test.prototype, "keywords", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 15 }),
    __metadata("design:type", Number)
], Test.prototype, "durationMinutes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Test.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Test.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Instructor', required: true }),
    __metadata("design:type", String)
], Test.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Test.prototype, "published", void 0);
exports.Test = Test = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Test);
exports.TestSchema = mongoose_1.SchemaFactory.createForClass(Test);
//# sourceMappingURL=test.schema.js.map