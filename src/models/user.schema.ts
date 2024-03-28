import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  lastName?: string;

  @Prop({ minlength: 10, maxlength: 10, unique: true, required: true })
  roll: string;

  @Prop()
  gender: string;

  @Prop()
  department: string;

  @Prop()
  profilePic: string;

  @Prop({ lowercase: true, unique: true, required: true })
  email: string;

  @Prop({ select: false, required: true })
  password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
