import { Injectable, Logger } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserSubmission,
  UserSubmissionDocument,
} from 'src/models/usersubmission.schema';
import { Model } from 'mongoose';
import { TestDocument } from 'src/models/test.schema';
import { Test } from '@nestjs/testing';
import { Question, QuestionDocument } from 'src/models/question.schema';
import {
  SubQuestion,
  SubQuestionDocument,
} from 'src/models/subquestion.schema';
import { SubQuestionService } from 'src/sub-question/sub-question.service';
import { QuestionService } from 'src/question/question.service';
import { SaveAudioSubmissionDto, SaveTextSubmissionDto } from './dto/save-text-submission.dto';

@Injectable()
export class SubmissionService {
  logger: Logger;

  constructor(
    @InjectModel(UserSubmission.name)
    private readonly submissionModel: Model<UserSubmissionDocument>,
    @InjectModel(Test.name) private readonly testModel: Model<TestDocument>,
    private readonly subQuestionService: SubQuestionService,
    private readonly questionService: QuestionService,
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(SubQuestion.name)
    private readonly subquestionModel: Model<SubQuestionDocument>,
    ) {
      this.logger = new Logger(SubmissionService.name);
    }
    
    async create(createSubmissionDto: CreateSubmissionDto) {
      const existingtest = await this.submissionModel.find({
        testId: createSubmissionDto.testId,
        userId: createSubmissionDto.userId,
      });

      if(existingtest){
        return existingtest;
      }

    const qs = await this.questionModel
      .find({ testId: createSubmissionDto.testId })
      .select('+_id');
    const ans = await Promise.all(
      qs.map(async (i) => {
        const sq = await this.subquestionModel.find({
          testId: createSubmissionDto.testId,
          questionId: i['_id'] as any,
        });
        return {
          qid: i['_id'].toString(),
          topic: i['topic'],
          content: i['content'],
          subQ: sq.map((s) => ({
            sqid: s['_id'].toString(),
            type: s['type'],
            answer: '',
            audiofileurl: '',
            audiototext: '',
            timeTaken: '',
            title: s['title'],
            content: s['content'],
          })),
        };
      }),
    );

    console.log(ans);
    const sub = this.submissionModel.create({
      testId: createSubmissionDto.testId,
      userId: createSubmissionDto.userId,
      answers: ans,
    });
    return sub;
  }

  async saveAnswer({id,index,type,answer,time}:SaveTextSubmissionDto) {
    const qs = await this.submissionModel.findById(id);
    const sbarray = qs?.answers[Number(index)]["subQ"];
    sbarray.forEach(e => {
      if(e.type==type){
        e["answer"] = answer;
        e["timeTaken"] =time;
        return; 
      }
    });
    qs.save()
    return qs;
  }

  async saveAudio({id,index,type,audiofile,audiotext}:SaveAudioSubmissionDto) {
    const qs = await this.submissionModel.findById(id);
    console.log(qs);
    const sbarray = qs?.answers[Number(index)]["subQ"];
    sbarray.forEach(e => {
      if(e.type==type){
        e["audiofileurl"] = audiofile;
        e["audiototext"] =audiotext;
        return; 
      }
    });
    qs.save();
    return qs;
  }


  async submitTest(id:String) {
    const qs = await this.submissionModel.findByIdAndUpdate(id,{
      submitted:true
    });
    
    return {
      id:qs?._id,
      message:"test submitted successfully ",
    status:"success",
    submitted:true,
  }
  }



  async findAll(id:String) {
    return await this.submissionModel.find({
      userId:id as any
    });
  }

  async findOne(id: string) {
    return this.submissionModel.findById(id);
  }

  async update(id: string, updateSubmissionDto: UpdateSubmissionDto) {
    return `This action updates a #${id} submission`;
  }

  async remove(id: string) {
    return `This action removes a #${id} submission`;
  }
}
