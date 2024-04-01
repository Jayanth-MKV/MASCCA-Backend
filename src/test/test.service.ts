import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test, TestDocument } from 'src/models/test.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { generateRandomToken } from 'src/utils/random-token';
import { getTestFields, objectParser } from 'src/utils/helpers';

@Injectable()
export class TestService {
  logger: Logger;

  constructor(
    @InjectModel(Test.name) private readonly testModel: Model<TestDocument>,
  ) {
    this.logger = new Logger(TestService.name);
  }

  // ----------------------------------------test---------------------------------------

  async createInviteLink(testId: string) {
    const test = await this.testModel.findById(testId);
    return `/test/${test._id}/${test.title}/${test.testSecret}/`;
  }

  async create(createTestDto: CreateTestDto, id: string) {
    const testSecret = await generateRandomToken();
    return await this.testModel.create({
      title: createTestDto.title,
      keywords:createTestDto.keywords,
      createdBy: id,
      testSecret,
    });
  }

  async findAll(id: string) {
    try {
      const testData = await this.testModel.find({
        createdBy: id,
      });
      if (!testData || testData.length == 0) {
        this.logger.error(`tests data not found!`);
        throw new NotFoundException('tests data not found!');
      }
      return testData;
    } catch (e) {
      throw new NotFoundException('tests data not found!');
    }
  }

  async findAllOng(id: string) {
    try {
      const testData = await this.testModel.find({
        createdBy: id,
        published: true,
      });
      if (!testData ) {
        this.logger.error(`tests data not found!`);
        throw new NotFoundException('tests data not found!');
      }
      return testData;
    } catch (e) {
      throw new NotFoundException('tests data not found!');
    }
  }

  async findOneU(id: string) {

    const allFields = await getTestFields(this.testModel);
    const existingtest = await this.testModel.findById(id);
    if (!existingtest) {
      this.logger.error(`test #${id} not found`);

      throw new NotFoundException(`test #${id} not found`);
    }

    const testR = await objectParser(existingtest,allFields);

    return testR;
  }


  async findOneI(id: string, uid: string) {
    const existingtest = await this.testModel.findById(id);
    const allFields = await getTestFields(this.testModel);

    if (existingtest.createdBy != uid) {
      this.logger.error(`cannot access test`);
      throw new NotFoundException(`cannot access test #${id} - not found`);
    }
    if (!existingtest) {
      this.logger.error(`test #${id} not found`);

      throw new NotFoundException(`test #${id} not found`);
    }
    const testR = await objectParser(existingtest,allFields);

    return testR;  }


    

  async update(id: string, updateTestDto: UpdateTestDto) {
    const existingtest = await this.testModel.findByIdAndUpdate(
      id,
      updateTestDto,
      { new: true },
    );
    if (!existingtest) {
      this.logger.error(`test #${id} not found`);

      throw new NotFoundException(`test #${id} not found`);
    }
    return existingtest;
  }

  async remove(id: string) {
    const deletedtest = await this.testModel.findByIdAndDelete(id);
    if (!deletedtest) {
      this.logger.error(`test #${id} not found`);
      throw new NotFoundException(`test #${id} not found`);
    }
    return deletedtest;
  }
}
