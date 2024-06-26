import { Module } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { Instructor, InstructorSchema } from 'src/models/instructor.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HashService } from 'src/hash/hash.service';
import { UploadService } from 'src/upload/upload.service';
import { SupabaseProvider } from 'src/providers/supabase.provider';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/models/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Instructor.name, schema: InstructorSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema:UserSchema }]),
  ],
  controllers: [InstructorController],
  providers: [InstructorService, HashService,UploadService,SupabaseProvider,UserService],
  exports:[InstructorService,MongooseModule]
})
export class InstructorModule {
  onModuleInit() {
    console.log('inst module');
  }
}
