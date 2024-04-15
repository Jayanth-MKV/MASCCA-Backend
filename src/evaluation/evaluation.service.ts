import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TestEvaluation, TestEvaluationDocument } from 'src/models/testevaluation.schema';
import { Model } from 'mongoose';
// import { Question, QuestionDocument } from 'src/models/question.schema';
// import { SubQuestion, SubQuestionDocument } from 'src/models/subquestion.schema';
import { SubmissionService } from 'src/submission/submission.service';
import { UserSubmissionDocument } from 'src/models/usersubmission.schema';
import { UploadService } from 'src/upload/upload.service';
import axios from 'axios';
import * as FormData from 'form-data';
import { FRONTEND_URL, FRONTEND_URLS } from 'src/utils/constants';


@Injectable()
export class EvaluationService {
  logger: Logger;

  constructor(
    @InjectModel(TestEvaluation.name)
    private readonly evaluationModel: Model<TestEvaluationDocument>,
    // @InjectModel(Question.name)
    // private readonly questionModel: Model<QuestionDocument>,
    // @InjectModel(SubQuestion.name)
    // private readonly subquestionModel: Model<SubQuestionDocument>,
    private readonly submissionService: SubmissionService,
    private readonly uploadService: UploadService,

  ) {
    this.logger = new Logger(EvaluationService.name);

  }



  async EvalTextemotion(id:string,index :string) {

     const subq = await this.submissionService.findbyindex(id,index,"TEXT");
    let  emotion:string, time:string ;
    if(subq){
    emotion = subq?.emotion || "neutral";
    time = subq?.timeTaken;
    }

    try {
      // Update emotion using evaluation service
      const updateEvaluationDto = {
        videoEmotion: emotion,
        time
      } as UpdateEvaluationDto;

      const p = await this.updateBySubId(id, Number(index), updateEvaluationDto);
      console.log("Evaluation Of Audio Updated"
      // ,p
    )
    return p;
    } catch (error) {
      console.error('Failed to predict audio emotion or update evaluation:', error);
    }


  }



  async getAudioEmotion(id: string, index: string) {

    const subq = await this.submissionService.findbyindex(id,index,"AUDIO");
    let audiofileurl: string ;
    if(subq){
    audiofileurl = subq?.audiofileurl;
    }
    

    const data = await this.uploadService.downloadFileFromSupabase(audiofileurl.slice(6));
    try {

      const formData = new FormData();
      const buf = await data.arrayBuffer();
      formData.append("file", Buffer.from(buf), {
        filename: "audio.wav",
      });

      const apiResult = await axios.post(process.env.SER_ENDPOINT, formData);

      console.log(apiResult.data);
      // Update emotion using evaluation service
      const updateEvaluationDto = {
        audioEmotion: apiResult?.data?.emotion
      } as UpdateEvaluationDto;

      const p = await this.updateBySubId(id, Number(index), updateEvaluationDto);
      console.log("Evaluation Of Audio Updated")
      return p;
        // ,p
      
    } catch (error) {
      // job.retry();
      console.error('Failed to predict audio emotion or update evaluation:', error);
      throw error;
    }

  }

  async getAudioRelevancy(id: string, index: string) {

    const subq = await this.submissionService.findbyindex(id,index,"AUDIO");
    let text: string ;
    if(subq){
    text = subq?.audiototext;
    }

    const sq = await this.submissionService.getAudioSQRel(subq.sqid);
    let referenceText: string,title:string,content:string ;
    if(sq){
      referenceText = sq?.powerReference;
      title=sq?.title,
      content=sq?.content
    }

    console.log(sq)

    try {

      const apiResult = await axios.post(`${FRONTEND_URL}/api/get-relevance`, {text,referenceText,title,content});

      // console.log(apiResult?.data);
      const ds = apiResult?.data;
      console.log(ds)
      // Update emotion using evaluation service
      const updateEvaluationDto = {
        audiotextRelevancy: ds?.relevance
      } as UpdateEvaluationDto;

      const p = await this.updateBySubId(id, Number(index), updateEvaluationDto);
      console.log("Evaluation Of Audio Relevancy Updated")
      return p;
      
    } catch (error) {
      // job.retry();
      console.error('AI not responding or error while getting results', error);
      throw error;
    }

  }





  async create(createEvaluationDto: CreateEvaluationDto) {


    const existingtest = await this.evaluationModel.findOne({
      testId: createEvaluationDto.testId,
      userId: createEvaluationDto.userId,
      submissionId: createEvaluationDto.submissionId,
    });

    if (existingtest) {
      return existingtest;
    }


    const subm = await this.submissionService.findOne(createEvaluationDto.submissionId.toString());
    const answers = (subm as UserSubmissionDocument)?.answers;

    const resu = answers.map((q) => {
      return {
        question_confidence: "",
        correctAnswer: "",
        audioEmotion: "",
        videoEmotion: "",
        audiotextRelevancy: "",
        time: "",
      }
    });

    console.log(resu);
    const sub = this.evaluationModel.create({
      testId: createEvaluationDto.testId,
      userId: createEvaluationDto.userId,
      submissionId: createEvaluationDto.submissionId,
      results: resu,
    });
    return sub;


  }

  async findAll(id: string) {
    return await this.evaluationModel.find({
      testId: id
    });
  }

  async findOne(id: string) {
    return await this.evaluationModel.findById(id);
  }

  async findOneSubId(id: string) {
    return await this.evaluationModel.findOne({
      submissionId: id
    });
  }




  async evalTest(id: string) {
    const sub = await this.submissionService.findOne(id);
    if (!sub) {
      return new NotFoundException("Submission Not Found");
    }

    const ev = await this.findOneSubId(id);
    if (!ev) {
      return new NotFoundException("Evaluation Not Found");
    }

    const results = ev.results;
    const answers = sub?.answers;

    if (!answers) {
      // Handle scenario where answers are missing (optional)
      return;
    }

    for (const [idx, question] of answers.entries()) {
      const subq = question?.subQ;

      if (!subq) {
        // Handle scenario where subQ is missing (optional)
        continue;
      }

      const subquestionResults = await Promise.all(
        subq.map(async (subquestion) => {

          if (subquestion.type === "TEXT") {
            const answer = await this.submissionService.evalTextSQ(subquestion.sqid, sub.testId, subquestion.answer);
            return { correctAnswer: answer || false,time:(subquestion.timeTaken && parseInt(subquestion.timeTaken)<0)?0:subquestion.timeTaken , videoEmotion:subquestion.emotion || "neutral" }; // Update subquestion object
          } else if (subquestion.type === "AUDIO") {

            // const answer = await this.submissionService.evalAudioSQ(subquestion.sqid, sub.testId, subquestion.audiototext);
            // Implement logic for "AUDIO" type (optional)
            let op = {};
            if(subquestion.audiototext==""){
              op = {...op, audiotextRelevancy: 0 }; // Or modify subquestion object as needed
            }
            if(subquestion.audiofileurl==""){
              op = {...op, audioEmotion: "NA" }; // Or modify subquestion object as needed
            }
            return op;

          } else {
            // Handle unsupported subquestion types (optional)
            throw new Error(`Unsupported subquestion type: ${subquestion.type}`);
          }
        })
      );

      results[idx] = { ...results[idx], ...Object.assign({}, ...subquestionResults) }; // Update results object
    }

    // console.log(results);

    const p = await this.evaluationModel.findOneAndUpdate(ev._id, {
      results
    }, { new: true });

    return p;

  }

  // subid - use algo on submitted results
  async getResults(id: string, reload: boolean = false) {

    const submission = await this.findOneSubId(id);
    const testConf = submission.testConfidence;
    if (testConf && !reload) {
      return { testConfidence: submission.testConfidence, confidenceLevel: await this.getConfidenceLevel(parseInt(submission.testConfidence)), "questions": submission.results.map(i => i.question_confidence), "eval": submission };
    }
    const results = submission.results;
    const totalQuestions = results.length;
    let sumConfidence = 0;

    // Calculate confidence for each question and sum up
    const rr = await Promise.all(results.map(async (question, idx) => {
      let correctAnswerConfidence = question.correctAnswer ? 100 : 0;
      let audioEmotion = await this.getEmotionValue(question.audioEmotion);
      let videoEmotion = await this.getEmotionValue(question.videoEmotion);
      let audiotextRelevancy = question.audiotextRelevancy as number;
      let timeTaken = parseInt(question?.time.toString());
      console.log(timeTaken)
      let timePercentage = ((timeTaken > 30) ? ((60 - timeTaken) / 60) : 1) * 100; // Convert time taken to percentage


      const questionConfidence = ((correctAnswerConfidence * 0.4) + (audioEmotion * 0.2) + (videoEmotion * 0.2) +
        (audiotextRelevancy * 0.1) +
        (timePercentage * 0.1));

      console.log({
        correctAnswerConfidence, audioEmotion, videoEmotion, audiotextRelevancy, timePercentage, questionConfidence
      })

      const payload = {
        question_confidence: (Number(questionConfidence.toFixed(2)) / 100),
        correctAnswer: question.correctAnswer,
        audioEmotion: question.audioEmotion,
        videoEmotion: question.videoEmotion,
        audiotextRelevancy: question.audiotextRelevancy as number,
        time: question.time.toString()
      }

      const l = await this.updateBySubId(id, idx, payload);

      sumConfidence += questionConfidence;

      return Number(questionConfidence.toFixed(2));
    }));

    // console.log(rr)

    // Calculate test confidence
    const testConfidence = (sumConfidence / totalQuestions);

    const evs = await this.evaluationModel.findOneAndUpdate({
      submissionId: id
    }, {
      testConfidence
    }, {
      new: true
    });

    const confidenceLevel = await this.getConfidenceLevel(testConfidence);

    // console.log("test confidence update: ", evs);



    return { testConfidence, confidenceLevel, "questions": rr, "eval": evs };
  }

  private async getEmotionValue(emotion: string): Promise<number> {
    switch (emotion) {
      case 'happy':
        return 100;
      case 'neutral':
        return 50;
      case 'sad':
        return 0;
      case 'NA':
        return 0;
      default:
        return 20;
    }
  }

  private async getConfidenceLevel(testConfidence: number): Promise<string> {
    // Determine confidence level
    let confidenceLevel = '';
    if (testConfidence <= 60) {
      confidenceLevel = 'LOW';
    } else if (testConfidence <= 80) {
      confidenceLevel = 'MEDIUM';
    } else {
      confidenceLevel = 'HIGH';
    }
    return confidenceLevel;
  }



  async updateById(id: string, updateEvaluationDto: UpdateEvaluationDto) {
    return await this.evaluationModel.updateOne({
      submissionId: id
    }, updateEvaluationDto)
  }



  async updateBySubId(id: string, index: number, updateEvaluationDto: UpdateEvaluationDto) {

    let em = null;
    em = await this.evaluationModel.findOne({
      submissionId: id
    })

    if (!em) {
      const emq = await this.submissionService.findOne(id);
      if (!emq) {
        return new NotFoundException("Submission Not Found")
      }
      em = await this.create({ submissionId: id, testId: emq.testId, userId: emq.userId });
    }


    const res = em?.results || [];
    if (Number(index) >= res.length) {
      return new BadRequestException("ques index exceeded - " + index);
    }
    res[index] = {
      ...res[index],
      ...updateEvaluationDto
    }

    // console.log("updating emotion got from api: ",res);

    const p = await this.evaluationModel.findOneAndUpdate(em._id, {
      results: res
    }, { new: true });

    return p;

  }

  async remove(id: string) {
    return `This action removes a #${id} evaluation`;
  }
}
