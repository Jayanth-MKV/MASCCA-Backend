"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationModule = void 0;
const common_1 = require("@nestjs/common");
const evaluation_service_1 = require("./evaluation.service");
const evaluation_controller_1 = require("./evaluation.controller");
const mongoose_1 = require("@nestjs/mongoose");
const testevaluation_schema_1 = require("../models/testevaluation.schema");
const submission_module_1 = require("../submission/submission.module");
const upload_service_1 = require("../upload/upload.service");
const supabase_provider_1 = require("../providers/supabase.provider");
let EvaluationModule = class EvaluationModule {
};
exports.EvaluationModule = EvaluationModule;
exports.EvaluationModule = EvaluationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: testevaluation_schema_1.TestEvaluation.name, schema: testevaluation_schema_1.TestEvaluationSchema }]),
            submission_module_1.SubmissionModule
        ],
        controllers: [evaluation_controller_1.EvaluationController],
        providers: [evaluation_service_1.EvaluationService, upload_service_1.UploadService, supabase_provider_1.SupabaseProvider],
        exports: [evaluation_service_1.EvaluationService, mongoose_1.MongooseModule]
    })
], EvaluationModule);
//# sourceMappingURL=evaluation.module.js.map