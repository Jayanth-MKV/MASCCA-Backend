// user-submission.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class UserSubmission {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Test' })
  testId: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;

  @Prop({default:false})
  submitted : boolean

  @Prop({
      required: true,
      name:"answers",
    type:SchemaTypes.Array,
    default:[
      {
        qid: { type: SchemaTypes.ObjectId, ref: 'Question' },
        topic: { type:String },
        content: { type: String },
        subQ:{ 
          name:"subQ",
          type: SchemaTypes.Array ,
          default:[
          {
            sqid: { type: SchemaTypes.ObjectId, ref: 'SubQuestion' },
            type: String,
            answer: String,
            emotion:String,
            audiofileurl: String,
            audiototext: String,
            timeTaken: String,
            title:String,
            content:String,
          },
        ],}
      },
    ]
  }
    )
  answers: [{
    qid: string;
    topic:String;
    content:String;
    subQ:[{
      sqid: string;
      type: 'TEXT' | 'AUDIO';
      answer?: string;
      emotion?:string,
      audiofileurl?: string;
      audiototext?: string;
      timeTaken?: string;
      title?:String;
      content?:String;
    }]
  }];
}

export type UserSubmissionDocument = UserSubmission & Document;

export const UserSubmissionSchema =
  SchemaFactory.createForClass(UserSubmission);
