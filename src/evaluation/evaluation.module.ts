import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestEvaluation, TestEvaluationSchema } from 'src/models/testevaluation.schema';
// import { Question, QuestionSchema } from 'src/models/question.schema';
import { SubmissionModule } from 'src/submission/submission.module';
import { UploadService } from 'src/upload/upload.service';
import { SupabaseProvider } from 'src/providers/supabase.provider';

@Module({
  imports:[
    MongooseModule.forFeature([{name:TestEvaluation.name,schema:TestEvaluationSchema}]),
    SubmissionModule
  ],
  controllers: [EvaluationController],
  providers: [EvaluationService,UploadService,SupabaseProvider],
  exports:[EvaluationService,MongooseModule]
})
export class EvaluationModule {}
