import { Module } from '@nestjs/common';
import { SubQuestionService } from './sub-question.service';
import { SubQuestionController } from './sub-question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubQuestion, SubQuestionSchema } from 'src/models/subquestion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubQuestion.name, schema: SubQuestionSchema },
    ]),
  ],
  controllers: [SubQuestionController],
  providers: [SubQuestionService],
  exports:[MongooseModule]
})
export class SubQuestionModule {}
