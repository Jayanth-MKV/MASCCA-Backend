"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const mongoose_1 = require("@nestjs/mongoose");
const hash_service_1 = require("./hash/hash.service");
const auth_service_1 = require("./auth/auth.service");
const auth_module_1 = require("./auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const instructor_module_1 = require("./instructor/instructor.module");
const passport_1 = require("@nestjs/passport");
const local_strategy_1 = require("./auth/strategies/local-strategy");
const jwt_strategy_1 = require("./auth/strategies/jwt.strategy");
const supabase_provider_1 = require("./providers/supabase.provider");
const upload_service_1 = require("./upload/upload.service");
const test_module_1 = require("./test/test.module");
const question_module_1 = require("./question/question.module");
const sub_question_module_1 = require("./sub-question/sub-question.module");
const submission_module_1 = require("./submission/submission.module");
const evaluation_module_1 = require("./evaluation/evaluation.module");
const google_oauth_strategy_1 = require("./auth/strategies/google-oauth.strategy");
const bull_1 = require("@nestjs/bull");
const app_processor_1 = require("./app.processor");
const evaluation_service_1 = require("./evaluation/evaluation.service");
let AppModule = class AppModule {
    onModuleInit() {
        console.log('app module');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    NODE_ENV: Joi.string()
                        .valid('development', 'production', 'test', 'provision')
                        .default('development'),
                    PORT: Joi.number().port().default(3000),
                    MONGO_URI: Joi.string()
                        .default('mongodb:localhost:27017/test')
                        .required(),
                }),
            }),
            bull_1.BullModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    redis: {
                        username: configService.get('REDIS_USER'),
                        password: configService.get('REDIS_PASS'),
                        tls: {
                            host: configService.get('REDIS_HOST'),
                            port: Number(configService.get('REDIS_PORT')) || 6379,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            bull_1.BullModule.registerQueue({
                name: 'audio',
            }),
            config_1.ConditionalModule.registerWhen(mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGO_URI'),
                }),
                inject: [config_1.ConfigService],
            }), 'MONGO_URI'),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                global: true,
                useFactory: async (configService) => {
                    console.log('JWT Module Registered - ');
                    return {
                        secret: configService.get('JWT_SECRET'),
                        signOptions: {
                            expiresIn: configService.get('JWT_EXPIRY'),
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            instructor_module_1.InstructorModule,
            test_module_1.TestModule,
            question_module_1.QuestionModule,
            sub_question_module_1.SubQuestionModule,
            submission_module_1.SubmissionModule,
            evaluation_module_1.EvaluationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_processor_1.AudioProcessor,
            supabase_provider_1.SupabaseProvider,
            app_service_1.AppService,
            hash_service_1.HashService,
            auth_service_1.AuthService,
            local_strategy_1.sLocalStrategy,
            local_strategy_1.iLocalStrategy,
            jwt_strategy_1.StudentJWTStrategy,
            jwt_strategy_1.InstructorJWTStrategy,
            upload_service_1.UploadService,
            google_oauth_strategy_1.GoogleStrategy,
            evaluation_service_1.EvaluationService
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map