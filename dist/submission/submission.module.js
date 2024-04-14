"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionModule = void 0;
const common_1 = require("@nestjs/common");
const submission_service_1 = require("./submission.service");
const submission_controller_1 = require("./submission.controller");
const mongoose_1 = require("@nestjs/mongoose");
const usersubmission_schema_1 = require("../models/usersubmission.schema");
const test_schema_1 = require("../models/test.schema");
const question_schema_1 = require("../models/question.schema");
const subquestion_schema_1 = require("../models/subquestion.schema");
const question_service_1 = require("../question/question.service");
const sub_question_service_1 = require("../sub-question/sub-question.service");
const evaluation_service_1 = require("../evaluation/evaluation.service");
const testevaluation_schema_1 = require("../models/testevaluation.schema");
const bull_1 = require("@nestjs/bull");
const upload_service_1 = require("../upload/upload.service");
const supabase_provider_1 = require("../providers/supabase.provider");
let SubmissionModule = class SubmissionModule {
};
exports.SubmissionModule = SubmissionModule;
exports.SubmissionModule = SubmissionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: usersubmission_schema_1.UserSubmission.name, schema: usersubmission_schema_1.UserSubmissionSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: test_schema_1.Test.name, schema: test_schema_1.TestSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: question_schema_1.Question.name, schema: question_schema_1.QuestionSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: subquestion_schema_1.SubQuestion.name, schema: subquestion_schema_1.SubQuestionSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: testevaluation_schema_1.TestEvaluation.name, schema: testevaluation_schema_1.TestEvaluationSchema }]),
            bull_1.BullModule.registerQueue({
                name: 'audio',
            }),
        ],
        controllers: [submission_controller_1.SubmissionController],
        providers: [submission_service_1.SubmissionService, question_service_1.QuestionService, sub_question_service_1.SubQuestionService, evaluation_service_1.EvaluationService, upload_service_1.UploadService, supabase_provider_1.SupabaseProvider],
        exports: [mongoose_1.MongooseModule, submission_service_1.SubmissionService]
    })
], SubmissionModule);
//# sourceMappingURL=submission.module.js.map