import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class SubQuestion {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Test', required: true })
  testId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Question', required: true })
  questionId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Instructor', required: true })
  createdBy: string;

  @Prop({ default: 'SubQuestion Title' })
  title: string;

  @Prop({ default: 'Sub Question content' })
  content: string;

  @Prop({ required: true, enum: ['AUDIO', 'TEXT'] })
  type: string;

  @Prop()
  powerReference?: string; // Power reference for audio type subquestion

  @Prop()
  correctAnswer?: string; // Correct answer for text type subquestion
}

export type SubQuestionDocument = SubQuestion & Document;

export const SubQuestionSchema = SchemaFactory.createForClass(SubQuestion);
