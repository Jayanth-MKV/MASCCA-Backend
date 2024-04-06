import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { SubQuestionService } from './sub-question.service';
import { UpdateSubQuestionDto } from './dto/update-sub-question.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { InstructorAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('subquestion')
@ApiTags('instructor')
@ApiBearerAuth()
@UseGuards(InstructorAuthGuard)
export class SubQuestionController {
  constructor(private readonly subQuestionService: SubQuestionService) {}

  @Get(':questionid')
  findAll(@Param('questionid') id: string) {
    return this.subQuestionService.findAll(id);
  }

  // @ApiTags('user')
  // @Get('user/:id')
  // findOneU(@Param('id') id: string) {
  //   return this.subQuestionService.findOneU(id);
  // }

  @Get('instructor/:id')
  @ApiParam({
    name: 'give question id to get sub questions',
  })
  findOneI(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any)?.user;
    return this.subQuestionService.findOneI(id, (user as any)?.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubQuestionDto: UpdateSubQuestionDto,
  ) {
    return this.subQuestionService.update(id, updateSubQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subQuestionService.remove(id);
  }
}
