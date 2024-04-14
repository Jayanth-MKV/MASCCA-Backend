"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../models/user.schema");
const hash_service_1 = require("../hash/hash.service");
const supabase_provider_1 = require("../providers/supabase.provider");
const upload_service_1 = require("../upload/upload.service");
const test_module_1 = require("../test/test.module");
const submission_module_1 = require("../submission/submission.module");
const instructor_schema_1 = require("../models/instructor.schema");
let UserModule = class UserModule {
    onModuleInit() {
        console.log('user module');
    }
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: instructor_schema_1.Instructor.name, schema: instructor_schema_1.InstructorSchema }]),
            test_module_1.TestModule,
            submission_module_1.SubmissionModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, hash_service_1.HashService, upload_service_1.UploadService, supabase_provider_1.SupabaseProvider],
        exports: [mongoose_1.MongooseModule, hash_service_1.HashService, user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map