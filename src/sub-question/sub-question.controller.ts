import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { SubQuestionService } from './sub-question.service';
import { UpdateSubQuestionDto } from './dto/update-sub-question.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { InstructorAuthGuard, StudentAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('subquestion')
@ApiTags('instructor')
@ApiBearerAuth()
export class SubQuestionController {
  constructor(private readonly subQuestionService: SubQuestionService) {}
  
  @Get(':questionid')
  @UseGuards(InstructorAuthGuard)
  findAll(@Param('questionid') id: string) {
    return this.subQuestionService.findAll(id);
  }
  
  @ApiTags('user')
  @Get('user/:id')
  @UseGuards(StudentAuthGuard)
  async findOneU(@Param('id') id: string) {
    return await this.subQuestionService.findOneU(id);
  }
  
  @Get('instructor/:id')
  @UseGuards(InstructorAuthGuard)
  @ApiParam({
    name: 'give question id to get sub questions',
  })
  findOneI(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any)?.user;
    return this.subQuestionService.findOneI(id, (user as any)?.id);
  }
  
  @Patch(':id')
  @UseGuards(InstructorAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateSubQuestionDto: UpdateSubQuestionDto,
  ) {
    return this.subQuestionService.update(id, updateSubQuestionDto);
  }

  @Delete(':id')
  @UseGuards(InstructorAuthGuard)
  remove(@Param('id') id: string) {
    return this.subQuestionService.remove(id);
  }
}
