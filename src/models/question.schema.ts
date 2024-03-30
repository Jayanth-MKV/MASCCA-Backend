import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class Question {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Test', required: true })
  testId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Instructor', required: true })
  createdBy: string;

  @Prop({ default: 'Question Title/Topic' })
  topic: string;

  @Prop({ default: 'Question content in markdown' })
  content: string;
}

export type QuestionDocument = Question & Document;

export const QuestionSchema = SchemaFactory.createForClass(Question);
