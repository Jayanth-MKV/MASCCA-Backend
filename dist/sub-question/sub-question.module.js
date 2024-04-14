"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubQuestionModule = void 0;
const common_1 = require("@nestjs/common");
const sub_question_service_1 = require("./sub-question.service");
const sub_question_controller_1 = require("./sub-question.controller");
const mongoose_1 = require("@nestjs/mongoose");
const subquestion_schema_1 = require("../models/subquestion.schema");
let SubQuestionModule = class SubQuestionModule {
};
exports.SubQuestionModule = SubQuestionModule;
exports.SubQuestionModule = SubQuestionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: subquestion_schema_1.SubQuestion.name, schema: subquestion_schema_1.SubQuestionSchema },
            ]),
        ],
        controllers: [sub_question_controller_1.SubQuestionController],
        providers: [sub_question_service_1.SubQuestionService],
        exports: [mongoose_1.MongooseModule]
    })
], SubQuestionModule);
//# sourceMappingURL=sub-question.module.js.map