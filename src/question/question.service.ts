import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionDocument } from 'src/models/question.schema';
import { Model } from 'mongoose';
import {
  SubQuestion,
  SubQuestionDocument,
} from 'src/models/subquestion.schema';
import { getTestFields, objectParser } from 'src/utils/helpers';

@Injectable()
export class QuestionService {
  logger: Logger;

  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(SubQuestion.name)
    private readonly subQuestionModel: Model<SubQuestionDocument>,
  ) {
    this.logger = new Logger(QuestionService.name);
  }

  async createFiveQuestions(createQuestionDto: CreateQuestionDto, id: string) {
    const questionData = await this.questionModel.find({
      ...createQuestionDto,
      createdBy: id,
    });
    if (questionData.length != 0) {
      this.logger.error(`questions data found!`);
      return questionData;
    } else {
      const arr = new Array(5).fill({
        testId: createQuestionDto?.testId,
        createdBy: id,
      });
      const ques = await this.questionModel.insertMany(arr);
      const subQuesT = ques.map((item) => ({
        testId: createQuestionDto.testId,
        questionId: item?._id,
        type: 'TEXT',
        createdBy: id,
      }));
      const subQuesA = ques.map((item) => ({
        testId: createQuestionDto.testId,
        questionId: item?._id,
        type: 'AUDIO',
        createdBy: id,
      }));

      const subQ = await this.subQuestionModel.insertMany([
        ...subQuesA,
        ...subQuesT,
      ]);
      return {
        message: `created : ${ques.length} Question , ${subQ.length} Sub Questions`,
      };
    }
  }

  async findAll(id: string) {
    try {
      const questionData = await this.questionModel.find({
        testId: id,
      });
      if (!questionData || questionData.length == 0) {
        this.logger.error(`questions data not found!`);
        throw new NotFoundException('questions data not found!');
      }

      const allFields = await getTestFields(this.subQuestionModel);

      const arr = [];
      for( let ques of questionData ){

        const subQuestionData = await this.subQuestionModel.find({
          questionId: ques._id,
        });
        const sqR = await Promise.all(subQuestionData.map(async (item)=>(await objectParser(item,allFields))));

        // console.log(sqR)
        arr.push({"question":ques,"subquestion":sqR});
      }

    return arr ;
    } catch (e) {
      throw new NotFoundException('questions data not found!');
    }
  }

  async findOneU(id: string) {
    const existingquestion = await this.questionModel.findById(id);
    if (!existingquestion) {
      this.logger.error(`question #${id} not found`);

      throw new NotFoundException(`question #${id} not found`);
    }
    return existingquestion;
  }

  async findOneI(id: string, uid: string) {
    const existingquestion = await this.questionModel.findById(id);
    if (existingquestion.createdBy != uid) {
      this.logger.error(`cannot access question`);
      throw new NotFoundException(`cannot access question #${id} - not found`);
    }

    if (!existingquestion) {
      this.logger.error(`question #${id} not found`);

      throw new NotFoundException(`question #${id} not found`);
    }

    const subQuestionData = await this.subQuestionModel.find({
      questionId: id,
    });
    if (!subQuestionData || subQuestionData.length == 0) {
      this.logger.error(`subQuestions data not found!`);
      throw new NotFoundException('subQuestions data not found!');
    }

    return {...existingquestion,"subquestion":subQuestionData};
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const existingquestion = await this.questionModel.findByIdAndUpdate(
      id,
      updateQuestionDto,
      { new: true },
    );
    if (!existingquestion) {
      this.logger.error(`question #${id} not found`);

      throw new NotFoundException(`question #${id} not found`);
    }
    return existingquestion;
  }

  async remove(id: string) {
    const deletedquestion = await this.questionModel.findByIdAndDelete(id);
    if (!deletedquestion) {
      this.logger.error(`question #${id} not found`);
      throw new NotFoundException(`question #${id} not found`);
    }
    return deletedquestion;
  }
}
