import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationService.create(createEvaluationDto);
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


  
  @Get('test/:id')
  async findAllIns(@Param('id') id: string) {
    return await this.evaluationService.findAll(id);
  }

}
