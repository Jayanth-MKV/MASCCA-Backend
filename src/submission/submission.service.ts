import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
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
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class SubmissionService {
  logger: Logger;

  constructor(
    @InjectModel(UserSubmission.name)
    private readonly submissionModel: Model<UserSubmissionDocument>,
    @InjectModel(Test.name) private readonly testModel: Model<TestDocument>,
    // private readonly subQuestionService: SubQuestionService,
    // private readonly questionService: QuestionService,
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(SubQuestion.name)
    private readonly subquestionModel: Model<SubQuestionDocument>,
    @InjectQueue('audio') private readonly audioQueue: Queue
  ) {
    this.logger = new Logger(SubmissionService.name);
  }

  async create(createSubmissionDto: CreateSubmissionDto) {
    const existingtest = await this.submissionModel.findOne({
      testId: createSubmissionDto.testId,
      userId: createSubmissionDto.userId,
    });

    if (existingtest) {
      return existingtest;
    }

    const qs = await this.questionModel
      .find({ testId: createSubmissionDto.testId })
      .select('+_id').sort({ createdAt: 1 });
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

  async saveAnswer({ id, index, type, answer, time, emotion }: SaveTextSubmissionDto) {
    const qs = await this.submissionModel.findById(id);
    if (!qs) {
      return new NotFoundException("Submission Not Found");
    }
    const sbarray = qs?.answers;
    if (Number(index) >= sbarray.length) {
      return new BadRequestException("ques index exceeded - " + index);
    }
    const obj = sbarray[Number(index)];
    const tps = obj["subQ"]?.map(et => {
      if (et.type == type) {
        const e = et;
        e["answer"] = answer;
        e["timeTaken"] = time;
        return e;
      }
      return et;
    }) as any;
    obj["subQ"] = tps;
    sbarray[Number(index)] = obj;

    console.log("sbarray: ", sbarray);

    const p = await this.submissionModel.findOneAndUpdate(qs._id, {
      answers: sbarray
    }, { new: true });

    const job = await this.audioQueue.add('text-emotion', { id, emotion, time, index });
    console.log(job)
    return p;
  }

  async saveAudio({ id, index, type, audiofile, audiotext }: SaveAudioSubmissionDto) {
    const qs = await this.submissionModel.findById(id);
    if (!qs) {
      return new NotFoundException("Submission Not Found");
    }
    const sbarray = qs?.answers;
    if (Number(index) >= sbarray.length) {
      return new BadRequestException("ques index exceeded - " + index);
    }
    const obj = sbarray[Number(index)];
    const tps = obj["subQ"]?.map(et => {
      if (et.type == type) {
        const e = et;
        e["audiofileurl"] = audiofile;
        e["audiototext"] = audiotext;
        return e;
      }
      return et;
    }) as any;
    obj["subQ"] = tps;
    sbarray[Number(index)] = obj;

    console.log("sbarray: ", sbarray);

    const p = await this.submissionModel.findOneAndUpdate(qs._id, {
      answers: sbarray
    }, { new: true });

    const job = await this.audioQueue.add('audio-emotion', { id, audiofileurl: audiofile, index });
    return p;
  }


  async submitTest(id: String) {
    const qs = await this.submissionModel.findByIdAndUpdate(id, {
      submitted: true
    });

    const job = await this.audioQueue.add('test-submitted', { id });
    console.log(job.data)
    return {
      id: qs?._id,
      message: "test submitted successfully ",
      status: "success",
      submitted: true,
    }
  }


  async evalTextSQ(id: string, testId: string, answer: string): Promise<boolean> {
    const sq = await this.subquestionModel.findOne({
      _id:id, testId
    });
    // console.log(sq);
    // console.log({id,testId});
    
    if(!sq){
      return false; 
      // new NotFoundException("sb question not found with id:",id)
    }
    if (sq.correctAnswer.trim() == answer.trim()) {
      return true;
    }
    return false;
  }

  async evalAudioSQ(id: string, testId: string, answer: string) {

  }



  async findAll(id: String) {
    return await this.submissionModel.find({
      userId: id as any
    }).sort({ createdAt: 1 });
  }

  async findAllT(id: String) {
    return await this.submissionModel.find({
      testId: id as any
    }).sort({ createdAt: 1 });
  }



  async findOne(id: string) {
    return await this.submissionModel.findById(id);
  }

  async update(id: string, updateSubmissionDto: UpdateSubmissionDto) {
    return `This action updates a #${id} submission`;
  }

  async remove(id: string) {
    return `This action removes a #${id} submission`;
  }
}
