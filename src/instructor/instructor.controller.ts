import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InstructorAuthGuard } from 'src/auth/guards/jwt.guard';
import { UploadService } from 'src/upload/upload.service';
import { MailDto, MultiMailDto } from './dto/mail.dto';

@Controller('instructor')
@ApiTags('instructor')
@UseGuards(InstructorAuthGuard)
@ApiBearerAuth()
export class InstructorController {
  constructor(
    private readonly instructorService: InstructorService,
    private readonly uploadService: UploadService,
  ) {}


  @Delete('test/:folderName')
  async deleteFolder(@Param('folderName') folderName: string): Promise<void> {
    return await this.uploadService.deleteFolderInSupabase(folderName);
  }


  @Post('sendinviteemail')
  sendEmail(@Body() MailDto: MailDto) {
    return this.instructorService.sendInviteEmail(MailDto);
  }

  @Post('sendinviteemails')
  sendEmails(@Body() MultiMailDto: MultiMailDto[]) {
    return this.instructorService.sendMultipleInviteEmails(MultiMailDto);
  }

  // @Post()
  // create(@Body() createInstructorDto: CreateInstructorDto) {
  //   return this.instructorService.create(createInstructorDto);
  // }

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
