import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InstructorAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('question')
@ApiTags('instructor')
@UseGuards(InstructorAuthGuard)
@ApiBearerAuth()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('fivequestions')
  async create(@Body() createQuestionDto: CreateQuestionDto, @Req() req: any) {
    const id = req?.user?.id;
    return await this.questionService.createFiveQuestions(
      createQuestionDto,
      id,
    );
  }

  @Get(':testid')
  async findAll(@Param('testid') id: string) {
    return await this.questionService.findAll(id);
  }

  @ApiTags('user')
  @Get('user/:id')
  async findOneU(@Param('id') id: string) {
    return await this.questionService.findOneU(id);
  }

  @Get('instructor/:id')
  async findOneI(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any)?.user;
    return await this.questionService.findOneI(id, (user as any)?.id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return await this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.questionService.remove(id);
  }
}
