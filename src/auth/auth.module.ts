import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { InstructorModule } from 'src/instructor/instructor.module';

@Module({
  imports: [UserModule, InstructorModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  onModuleInit() {
    console.log('auth module');
  }
}
