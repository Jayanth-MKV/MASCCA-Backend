import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { InstructorAuthGuard, StudentAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('test')
// @ApiTags('test')
@ApiTags('instructor')
@ApiBearerAuth()
export class TestController {
  constructor(private readonly testService: TestService) {}

  // ----------------------------------------test---------------------------------------
 
 
  @Post('create')
  @UseGuards(InstructorAuthGuard)
  create(@Body() createTestDto: CreateTestDto, @Req() req: any) {
    const id = req?.user?.id;
    return this.testService.create(createTestDto, id);
  }

  @Get('invitelink/:testid')
  @UseGuards(InstructorAuthGuard)
  getInviteLink(@Param('testid') id:string) {

    return this.testService.createInviteLink(id);
  }

  @Get('instructor/mytests')
  @UseGuards(InstructorAuthGuard)
  findAll(@Req() req: Request) {
    const user = (req as any)?.user;

    return this.testService.findAll(user?.id);
  }

  @Get('instructor/mytests/ongoing')
  @UseGuards(InstructorAuthGuard)
  findAllOngoing(@Req() req: Request) {
    const user = (req as any)?.user;

    return this.testService.findAllOng(user?.id);
  }
  // @Get(':instId')
  // findAll(@Param('instId') instId:string ) {
  //   return this.testService.findAll(instId);
  // }

  @ApiTags('user')
  @Get('user/:id')
  @UseGuards(StudentAuthGuard)
  findOneU(@Param('id') id: string) {
    return this.testService.findOneU(id);
  }

  @Get('instructor/:id')
  @UseGuards(InstructorAuthGuard)
  findOneI(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any)?.user;
    return this.testService.findOneI(id, (user as any)?.id);
  }

  @Patch(':id')
  @UseGuards(InstructorAuthGuard)
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(id, updateTestDto);
  }

  @Delete(':id')
  @UseGuards(InstructorAuthGuard)
  remove(@Param('id') id: string) {
    return this.testService.remove(id);
  }

  // ----------------------------------------question---------------------------------------


  // ----------------------------------------sub-question---------------------------------------
  
  
  // ----------------------------------------user-submission---------------------------------------
  
  
  // ----------------------------------------test-evaluation---------------------------------------
}
