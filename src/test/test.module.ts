import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from 'src/models/test.schema';
import { InstructorModule } from 'src/instructor/instructor.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name:Test.name,schema:TestSchema}]),
    InstructorModule
  ],
  controllers: [TestController],
  providers: [TestService],
  exports:[TestService]
})
export class TestModule {}
