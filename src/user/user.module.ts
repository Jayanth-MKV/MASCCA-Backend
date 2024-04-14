import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user.schema';
import { HashService } from 'src/hash/hash.service';
import { SupabaseProvider } from 'src/providers/supabase.provider';
import { UploadService } from 'src/upload/upload.service';
import { TestModule } from 'src/test/test.module';
import { SubmissionModule } from 'src/submission/submission.module';
import { Instructor, InstructorSchema } from 'src/models/instructor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Instructor.name, schema: InstructorSchema }]),
    TestModule,
    SubmissionModule,
  ],
  controllers: [UserController],
  providers: [UserService, HashService,UploadService,SupabaseProvider],
  exports: [MongooseModule, HashService, UserService],
})
export class UserModule {
  onModuleInit() {
    console.log('user module');
  }
}
