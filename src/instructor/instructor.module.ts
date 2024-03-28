import { Module } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { Instructor, InstructorSchema } from 'src/models/instructor.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HashService } from 'src/hash/hash.service';
import { UploadService } from 'src/upload/upload.service';
import { SupabaseProvider } from 'src/providers/supabase.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Instructor.name, schema: InstructorSchema }]),
  ],
  controllers: [InstructorController],
  providers: [InstructorService, HashService,UploadService,SupabaseProvider],
  exports:[InstructorService]
})
export class InstructorModule {
  onModuleInit() {
    console.log('inst module');
  }
}
