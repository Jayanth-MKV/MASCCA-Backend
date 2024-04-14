import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { AudioReEvaluationDto, CreateEvaluationDto, TextReEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationService.create(createEvaluationDto);
  }

  
  @Post('audio/reload')
  async getAudiEmo(@Body() data : AudioReEvaluationDto) {
    let index = data?.index;
    return await this.evaluationService.getAudioEmotion(data.id,index);
  }
  
  @Post('text/reload')
  async gettextEmo(@Body() data : TextReEvaluationDto) {
    let index = data?.index;
    return await this.evaluationService.EvalTextemotion(data.id,index);
  }

  
  @Get('submission/:id/test/reload')
  async testReval(@Param('id') id: string) {
    return await this.evaluationService.evalTest(id);
  }


  
  @Get('getbysubid/:id')
  async findOnebysubId(@Param('id') id: string) {
    return await this.evaluationService.findOneSubId(id);
  }

  @Get(':id')
  async findOneId(@Param('id') id: string) {
    return await this.evaluationService.findOne(id);
  }


  @Get('test/:id')
  async findOnetId(@Param('id') id: string) {
    return await this.evaluationService.findAll(id);
  }

  @Get('submission/:id/results')
  async getResults(@Param('id') id: string) {
    return await this.evaluationService.getResults(id);
  }

  @Get('submission/:id/results/reload')
  async getResultsReload(@Param('id') id: string) {
    return await this.evaluationService.getResults(id,true);
  }



  
  @Get('test/inst/:id')
  async findAllIns(@Param('id') id: string) {
    return await this.evaluationService.findAll(id);
  }

}
