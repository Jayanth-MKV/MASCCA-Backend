import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { QuestionSchema, Question } from './question.schema';

@Schema({ timestamps: true })
export class Test {
  @Prop()
  title: string;

  @Prop()
  instructions: string;

  @Prop()
  guidelines: string;

  @Prop()
  tandc: string;

  @Prop()
  testSecret: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Question' }] })
  questions: string[];

  @Prop({ required: true })
  durationMinutes: number;

  @Prop({ type: Date })
  startTime: Date;

  @Prop({ type: Date })
  endTime: Date;

  // Created by instructor
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Instructor' })
  createdBy: string;
}

export type TestDocument = Test & Document;

export const TestSchema = SchemaFactory.createForClass(Test);
