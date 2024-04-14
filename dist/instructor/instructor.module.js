"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorModule = void 0;
const common_1 = require("@nestjs/common");
const instructor_service_1 = require("./instructor.service");
const instructor_controller_1 = require("./instructor.controller");
const instructor_schema_1 = require("../models/instructor.schema");
const mongoose_1 = require("@nestjs/mongoose");
const hash_service_1 = require("../hash/hash.service");
const upload_service_1 = require("../upload/upload.service");
const supabase_provider_1 = require("../providers/supabase.provider");
const user_service_1 = require("../user/user.service");
const user_schema_1 = require("../models/user.schema");
let InstructorModule = class InstructorModule {
    onModuleInit() {
        console.log('inst module');
    }
};
exports.InstructorModule = InstructorModule;
exports.InstructorModule = InstructorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: instructor_schema_1.Instructor.name, schema: instructor_schema_1.InstructorSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
        ],
        controllers: [instructor_controller_1.InstructorController],
        providers: [instructor_service_1.InstructorService, hash_service_1.HashService, upload_service_1.UploadService, supabase_provider_1.SupabaseProvider, user_service_1.UserService],
        exports: [instructor_service_1.InstructorService, mongoose_1.MongooseModule]
    })
], InstructorModule);
//# sourceMappingURL=instructor.module.js.map