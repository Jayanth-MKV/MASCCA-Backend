import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InstructorAuthGuard, StudentAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('question')
@ApiTags('instructor')
@ApiBearerAuth()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('fivequestions')
  @UseGuards(InstructorAuthGuard)
  async create(@Body() createQuestionDto: CreateQuestionDto, @Req() req: any) {
    const id = req?.user?.id;
    return await this.questionService.createFiveQuestions(
      createQuestionDto,
      id,
    );
  }

  @Get('all/:testid')
  @UseGuards(InstructorAuthGuard)
  async findAllI(@Param('testid') id: string) {
    return await this.questionService.findAll(id);
  }

  @Get(':testid')
  @ApiTags('user')
  @UseGuards(StudentAuthGuard)
  async findAllU(@Param('testid') id: string) {
    return await this.questionService.findAll(id);
  }

  // @ApiTags('user')
  // @UseGuards(StudentAuthGuard)
  // @Get('user/:id')
  // async findOneU(@Param('id') id: string) {
  //   return await this.questionService.findOneU(id);
  // }

  
  // @ApiTags('user')
  // @Get('test/allquestions?')
  // @UseGuards(StudentAuthGuard)
  // getques(@Query('testid') id: string) {
  //   return this.questionService.findOneU(id);
  // }

  @Get('instructor/:id')
  @UseGuards(InstructorAuthGuard)
  async findOneI(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any)?.user;
    return await this.questionService.findOneI(id, (user as any)?.id);
  }

  @Patch(':id')
  @UseGuards(InstructorAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return await this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @UseGuards(InstructorAuthGuard)
  async remove(@Param('id') id: string) {
    return await this.questionService.remove(id);
  }
}
