import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class TestEvaluation {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'UserSubmission', required: true })
  submissionId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Test', required: true })
  testId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ default: "" })
  testConfidence: string;

  @Prop({
    required: true,
    name: "results",
    type: SchemaTypes.Array,
    default: [
      {
        question_confidence: Number,
        audioEmotion: String,
        videoEmotion: String,
        correctAnswer: Number,
        audiotextRelevancy: Number,
        time: String,
      }
    ],
  })

  results: [{
    question_confidence: Number;
    correctAnswer: boolean;
    audioEmotion: string;
    videoEmotion: string;
    audiotextRelevancy: Number;
    time: String;
  }];
}

export type TestEvaluationDocument = TestEvaluation & Document;

export const TestEvaluationSchema =
  SchemaFactory.createForClass(TestEvaluation);
