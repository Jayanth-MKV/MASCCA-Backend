import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InstructorAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('instructor')
@ApiTags('instructor')
@UseGuards(InstructorAuthGuard)
@ApiBearerAuth()
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post('register')
  Register(@Body() CreateInstructorDto:CreateInstructorDto) {
    return this.instructorService.registerInstructor(CreateInstructorDto);
  }

  @Post()
  create(@Body() createInstructorDto: CreateInstructorDto) {
    return this.instructorService.create(createInstructorDto);
  }

  @Get()
  findAll() {
    return this.instructorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instructorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ) {
    return this.instructorService.update(id, updateInstructorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instructorService.remove(id);
  }
}
