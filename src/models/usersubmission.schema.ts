// user-submission.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class UserSubmission {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Test' })
  testId: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;

  @Prop({
    required: true,
    type: [
      {
        qid: SchemaTypes.ObjectId,
        subQ: [
          {
            sqid: SchemaTypes.ObjectId,
            type: String,
            answer: String,
            audiofileurl: String,
            audiototext: String,
          },
        ],
      },
    ],
  })
  answers: Array<{
    qid: string;
    subQ: Array<{
      sqid: string;
      type: 'TEXT' | 'AUDIO';
      answer: string;
      audiofileurl?: string;
      audiototext?: string;
    }>;
  }>;
}

export type UserSubmissionDocument = UserSubmission & Document;

export const UserSubmissionSchema =
  SchemaFactory.createForClass(UserSubmission);
