import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConditionalModule, ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { HashService } from './hash/hash.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { InstructorModule } from './instructor/instructor.module';
import { PassportModule } from '@nestjs/passport';
import { iLocalStrategy, sLocalStrategy } from './auth/strategies/local-strategy';
import { InstructorJWTStrategy, StudentJWTStrategy } from './auth/strategies/jwt.strategy';
import { SupabaseProvider } from './providers/supabase.provider';
import { UploadService } from './upload/upload.service';
import { TestModule } from './test/test.module';
import { QuestionModule } from './question/question.module';
import { SubQuestionModule } from './sub-question/sub-question.module';
import { SubmissionModule } from './submission/submission.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { GoogleStrategy } from './auth/strategies/google-oauth.strategy';
import { BullModule } from '@nestjs/bull';
import { AudioProcessor } from './app.processor';
import { EvaluationService } from './evaluation/evaluation.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: './.env',
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
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          username: configService.get<string>('REDIS_USER'),
          password: configService.get<string>('REDIS_PASS'),
          tls: {
            host: configService.get<string>('REDIS_HOST'),
            port: Number(configService.get<string>('REDIS_PORT')) || 6379,
          },
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'audio',
    }),
    ConditionalModule.registerWhen(
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('MONGO_URI'),
        }),
        inject: [ConfigService],
      }),
      'MONGO_URI',
    ),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (configService: ConfigService) => {

        console.log(
          'JWT Module Registered - ');

        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRY'),
          },
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    InstructorModule,
    TestModule,
    QuestionModule,
    SubQuestionModule,
    SubmissionModule,
    EvaluationModule,
  ],
  controllers: [AppController],
  providers: [
    AudioProcessor,
    SupabaseProvider,
    AppService,
    HashService,
    AuthService,
    sLocalStrategy,
    iLocalStrategy,
    StudentJWTStrategy,
    InstructorJWTStrategy,
    UploadService,
    GoogleStrategy,
    EvaluationService
  ],
})
export class AppModule {
  onModuleInit() {
    console.log('app module');
  }
}
