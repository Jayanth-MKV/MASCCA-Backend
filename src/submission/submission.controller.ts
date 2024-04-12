import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { ApiTags } from '@nestjs/swagger';
import { SaveAudioSubmissionDto, SaveTextSubmissionDto } from './dto/save-text-submission.dto';
import { EvaluationService } from 'src/evaluation/evaluation.service';
import { SubmissionInterceptor } from './submission.interceptor';

@Controller('submission')
@ApiTags('user')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService,
    private readonly evaluationService: EvaluationService
    ) {}

  @Post()
  async create(@Body() createSubmissionDto: CreateSubmissionDto) {
    const sub = await this.submissionService.create(createSubmissionDto);
    const _ = await  this.evaluationService.create({submissionId:sub._id,...createSubmissionDto});
    
    return sub;
  }

  @Post('text')
  @UseInterceptors(SubmissionInterceptor) // Apply interceptor to this method
  async updatetext(@Body() saveTextSubmissionDto: SaveTextSubmissionDto) {
    return await this.submissionService.saveAnswer(saveTextSubmissionDto);
  }

  @Post('audio')
  @UseInterceptors(SubmissionInterceptor) // Apply interceptor to this method
  async updateaudio(@Body() saveAudioSubmissionDto: SaveAudioSubmissionDto) {
    return await this.submissionService.saveAudio(saveAudioSubmissionDto);
  }

  @Post('test/:id')
  // @UseInterceptors(SubmissionInterceptor) // Apply interceptor to this method
  async submitTest(@Param('id') id:string) {
    return await this.submissionService.submitTest(id);
  }

  @Get('user/:userId')
  async findAll(@Param('userId') id:string) {
    return await this.submissionService.findAll(id);
  }


  @Get('all/:testId')
  async findAllT(@Param('testId') id:string) {
    return await this.submissionService.findAll(id);
  }



  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.submissionService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(SubmissionInterceptor) // Apply interceptor to this method
  async update(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
    return await this.submissionService.update(id, updateSubmissionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.submissionService.remove(id);
  }
}
