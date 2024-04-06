import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSubmission, UserSubmissionSchema } from 'src/models/usersubmission.schema';
import { Test, TestSchema } from 'src/models/test.schema';
import { Question, QuestionSchema } from 'src/models/question.schema';
import { SubQuestion, SubQuestionSchema } from 'src/models/subquestion.schema';
import { QuestionService } from 'src/question/question.service';
import { SubQuestionService } from 'src/sub-question/sub-question.service';
import { EvaluationService } from 'src/evaluation/evaluation.service';
import { TestEvaluation, TestEvaluationSchema } from 'src/models/testevaluation.schema';
import { BullModule } from '@nestjs/bull';

@Module({
  imports:[
    MongooseModule.forFeature([{name:UserSubmission.name,schema:UserSubmissionSchema}]),
    MongooseModule.forFeature([{name:Test.name,schema:TestSchema}]),
    MongooseModule.forFeature([{name:Question.name,schema:QuestionSchema}]),
    MongooseModule.forFeature([{name:SubQuestion.name,schema:SubQuestionSchema}]),
    MongooseModule.forFeature([{name:TestEvaluation.name,schema:TestEvaluationSchema}]),
    BullModule.registerQueue({
      name: 'audio',
    }),
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService,QuestionService,SubQuestionService,EvaluationService],
  exports:[MongooseModule,SubmissionService]
})
export class SubmissionModule {}
