import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class TestEvaluation {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Test' })
  testId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;

  @Prop({
    required: true,
    type: [
      {
        qid: { type: SchemaTypes.ObjectId, ref: 'Question' },
        question_confidence: Number,
        subQ: [
          {
            sqid: { type: SchemaTypes.ObjectId, ref: 'SubQuestion' },
            type: String,
            sub_question_confidence: Number,
            audiotextRelevancy: Number,
            emotion: String,
          },
        ],
      },
    ],
  })
    
  results: Array<{
    qid: string;
    question_confidence: number;
    subQ: Array<{
      sqid: string;
      type: 'TEXT' | 'AUDIO';
      sub_question_confidence: number;
      audiotextRelevancy: number;
      emotion: string;
    }>;
  }>;
}

export type TestEvaluationDocument = TestEvaluation & Document;

export const TestEvaluationSchema =
  SchemaFactory.createForClass(TestEvaluation);
