import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class SubQuestion {
  @Prop({ required: true })
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
