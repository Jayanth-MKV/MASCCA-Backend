import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


enum LoginType{
  CRED,
  GOOGLE
}
@Schema({ timestamps: true })
export class Instructor {
  @Prop()
  name: string;

  @Prop()
  lastName?: string;

  @Prop({ required: true })
  Department: string;

  @Prop()
  gender: string;

  @Prop()
  profilePic: string;

  @Prop({ lowercase: true, unique: true, required: true })
  email: string;

  @Prop({ select: false, required: true })
  password: string;

  @Prop({default:"CRED",uppercase:true,enum:LoginType})
  type:string;
}

export type InstructorDocument = Instructor & Document;

export const InstructorSchema = SchemaFactory.createForClass(Instructor);