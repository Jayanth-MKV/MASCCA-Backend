import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { SubQuestionSchema, SubQuestion } from './subquestion.schema';

@Schema({ timestamps: true })
export class Question {
  @Prop()
  topic: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [{type:SchemaTypes.ObjectId,ref:"SubQuestion"}] })
  subQuestions: string[];
}

export type QuestionDocument = Question & Document;

export const QuestionSchema = SchemaFactory.createForClass(Question);
