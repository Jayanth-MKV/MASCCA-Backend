import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class Test {
  @Prop()
  title: string;
  
  @Prop({default:false})
  private: boolean;

  @Prop()
  about: string;

  @Prop({default:"You have 15 minutes to complete the test. Once you begin, the timer will start and cannot be paused. Please make sure you have a stable internet connection.  "})
  instructions: string;

  @Prop({default:"Do not use any external resources.\nComplete the test individually.\nDo not refresh the page during the test."})
  guidelines: string;

  @Prop({default:"By participating in this test, you agree to the following terms and conditions:\n1. The test is conducted solely for educational and assessment purposes.\nAll questions and materials provided in the test are confidential and should not be shared with others.\n3. Any form of cheating or plagiarism is strictly prohibited.\n4. The test duration is limited, and once started, it cannot be paused or restarted.\n5. Participants must ensure a stable internet connection to avoid any disruptions during the test.\n6. The test results may be used for evaluation and feedback purposes.\nThank you for your cooperation.\n"})
  tandc: string;

  @Prop({ required: true })
  testSecret: string;

  @Prop({ type: SchemaTypes.Array })
  keywords: string[];

  @Prop({default:15})
  durationMinutes: number;

  @Prop({ type: Date })
  startTime: Date;

  @Prop({ type: Date })
  endTime: Date;

  // Created by instructor
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Instructor', required: true })
  createdBy: string;

  @Prop({default:false})
  published: boolean;
}

export type TestDocument = Test & Document;

export const TestSchema = SchemaFactory.createForClass(Test);
