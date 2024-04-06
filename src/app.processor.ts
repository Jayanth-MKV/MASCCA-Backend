import { UploadService } from 'src/upload/upload.service';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { DoneCallback } from 'bull';
import { EvaluationService } from './evaluation/evaluation.service';
import { UpdateEvaluationDto } from './evaluation/dto/update-evaluation.dto';
import axios from 'axios';
import * as FormData from 'form-data';
import { Buffer } from 'node:buffer';
import { Readable } from 'stream';


interface jobInterface {
  id: string;
  audiofileurl?: string;
  index: number;
  emotion?:string;
  time?:string;
}

export default function (job: Job, cb: DoneCallback) {
  console.log(`[${process.pid}] ${JSON.stringify(job.data)}`);
  cb(null, 'It works');
}

@Processor('audio')
export class AudioProcessor {
  constructor(
    private readonly evaluationService: EvaluationService,
    private readonly uploadService: UploadService
  ) { }

  @Process('audio-emotion')
  async getAudioEmotion(job: Job<jobInterface>) {

    const { id, audiofileurl, index } = job.data;
    const data = await this.uploadService.downloadFileFromSupabase(audiofileurl.slice(6));

    // get file from supabase  - returns blob.

    // this data send to api ("curl -X 'POST' \
    // 'https://ser-api.onrender.com/predict_audio' \
    // -H 'accept: application/json' \
    // -H 'Content-Type: multipart/form-data' \") and get emotion 

    // then update the emotion using evaluation servuce -   async updateBySubId(id: string,index:number, updateEvaluationDto: UpdateEvaluationDto) {
    // where updatedto will be {audioEmotion: api result : {
    //   "emotion": "happy"
    // }


    try {

      const formData = new FormData();
      const buf = await data.arrayBuffer();
      formData.append("file", Buffer.from(buf),{
        filename:"audio.wav",
      });

      const apiResult = await axios.post(process.env.SER_ENDPOINT,formData
    );

      // console.log(apiResult);
      // Update emotion using evaluation service
      const updateEvaluationDto = {
        audioEmotion: apiResult?.data?.emotion
      } as UpdateEvaluationDto;

      const p = await this.evaluationService.updateBySubId(id, index, updateEvaluationDto);
      console.log("Evaluation Of Audio Updated",p)
    } catch (error) {
      console.error('Failed to predict audio emotion or update evaluation:', error);
    }


  }


  @Process('text-emotion')
  async saveTextemotion(job: Job<jobInterface>) {

    const { id, emotion, time,index } = job.data;


    try {
      // Update emotion using evaluation service
      const updateEvaluationDto = {
        videoEmotion: emotion,
        time
      } as UpdateEvaluationDto;

      const p = await this.evaluationService.updateBySubId(id, index, updateEvaluationDto);
      console.log("Evaluation Of Audio Updated",p)
    } catch (error) {
      console.error('Failed to predict audio emotion or update evaluation:', error);
    }


  }

  @Process('test-submitted')
  async testSubmitted(job: Job<jobInterface>) {
// submission id
    const { id} = job.data;

    try {
      const p = await this.evaluationService.evalTest(id);
      console.log("Evaluation Of Test",p)
    } catch (error) {
      console.error('Failed to Evaluate Test:', error);
    }

  }

}
