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

@Module({
  imports:[
    MongooseModule.forFeature([{name:UserSubmission.name,schema:UserSubmissionSchema}]),
    MongooseModule.forFeature([{name:Test.name,schema:TestSchema}]),
    MongooseModule.forFeature([{name:Question.name,schema:QuestionSchema}]),
    MongooseModule.forFeature([{name:SubQuestion.name,schema:SubQuestionSchema}]),
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService,QuestionService,SubQuestionService],
  exports:[MongooseModule,SubmissionService]
})
export class SubmissionModule {}
