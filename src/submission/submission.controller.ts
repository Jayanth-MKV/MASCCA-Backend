import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { ApiTags } from '@nestjs/swagger';
import { SaveAudioSubmissionDto, SaveTextSubmissionDto } from './dto/save-text-submission.dto';

@Controller('submission')
@ApiTags('user')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  async create(@Body() createSubmissionDto: CreateSubmissionDto) {
    return await this.submissionService.create(createSubmissionDto);
  }

  @Post('text')
  async updatetext(@Body() saveTextSubmissionDto: SaveTextSubmissionDto) {
    return await this.submissionService.saveAnswer(saveTextSubmissionDto);
  }

  @Post('audio')
  async updateaudio(@Body() saveAudioSubmissionDto: SaveAudioSubmissionDto) {
    return await this.submissionService.saveAudio(saveAudioSubmissionDto);
  }

  @Post('test/:id')
  async submitTest(@Param('id') id:string) {
    return await this.submissionService.submitTest(id);
  }

  @Get(':userId')
  async findAll(@Param('userId') id:string) {
    return await this.submissionService.findAll(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.submissionService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
    return await this.submissionService.update(id, updateSubmissionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.submissionService.remove(id);
  }
}
