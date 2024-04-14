import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SubQuestion, SubQuestionDocument } from 'src/models/subquestion.schema';
import { Model } from 'mongoose';
import { UpdateSubQuestionDto } from './dto/update-sub-question.dto';

@Injectable()
export class SubQuestionService {
  logger: Logger;

  constructor(
    @InjectModel(SubQuestion.name)
    private readonly subQuestionModel: Model<SubQuestionDocument>,
  ) {
    this.logger = new Logger(SubQuestionService.name);
  }

  async findAll(id: string) {
    try {
      const subQuestionData = await this.subQuestionModel.find({
        questionId: id,
      });
      if (!subQuestionData || subQuestionData.length == 0) {
        this.logger.error(`subQuestions data not found!`);
        throw new NotFoundException('subQuestions data not found!');
      }
      return subQuestionData;
    } catch (e) {
      throw new NotFoundException('subQuestions data not found!');
    }
  }

  async findOneU(id: string) {
    const existingsubQuestion = await this.subQuestionModel.findById(id);
    if (!existingsubQuestion) {
      this.logger.error(`subQuestion #${id} not found`);

      throw new NotFoundException(`subQuestion #${id} not found`);
    }
    return existingsubQuestion;
  }

  async findOneI(id: string, uid: string) {
    const existingsubQuestion = await this.subQuestionModel.findById(id);
    if (existingsubQuestion.createdBy != uid) {
      this.logger.error(`cannot access subQuestion`);
      throw new NotFoundException(`cannot access subQuestion #${id} - not found`);
    }
    if (!existingsubQuestion) {
      this.logger.error(`subQuestion #${id} not found`);

      throw new NotFoundException(`subQuestion #${id} not found`);
    }
    return existingsubQuestion;
  }

  async update(id: string, updateSubQuestionDto: UpdateSubQuestionDto) {
    const existingsubQuestion = await this.subQuestionModel.findByIdAndUpdate(
      id,
      updateSubQuestionDto,
      { new: true },
    );
    if (!existingsubQuestion) {
      this.logger.error(`subQuestion #${id} not found`);

      throw new NotFoundException(`subQuestion #${id} not found`);
    }
    return existingsubQuestion;
  }

  async remove(id: string) {
    const deletedsubQuestion = await this.subQuestionModel.findByIdAndDelete(id);
    if (!deletedsubQuestion) {
      this.logger.error(`subQuestion #${id} not found`);
      throw new NotFoundException(`subQuestion #${id} not found`);
    }
    return deletedsubQuestion;
  }
}
