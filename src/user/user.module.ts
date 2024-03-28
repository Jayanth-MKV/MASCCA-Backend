import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user.schema';
import { HashService } from 'src/hash/hash.service';
import { SupabaseProvider } from 'src/providers/supabase.provider';
import { UploadService } from 'src/upload/upload.service';
import { TestModule } from 'src/test/test.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TestModule
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
