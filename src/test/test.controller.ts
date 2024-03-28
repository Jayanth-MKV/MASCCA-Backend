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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InstructorAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('test')
// @ApiTags('test')
@ApiTags('instructor')
@UseGuards(InstructorAuthGuard)
@ApiBearerAuth()
export class TestController {
  constructor(private readonly testService: TestService) {}

  // ----------------------------------------test---------------------------------------
 
 
  @Post('create')
  create(@Body() createTestDto: CreateTestDto, @Req() req: any) {
    const id = req?.user?.id;
    return this.testService.create(createTestDto, id);
  }

  @Get('invitelink/:testid')
  getInviteLink(@Param('testid') id:string) {

    return this.testService.createInviteLink(id);
  }

  @Get('instructor/mytests')
  findAll(@Req() req: Request) {
    const user = (req as any)?.user;

    return this.testService.findAll(user?.id);
  }

  @Get('instructor/mytests/ongoing')
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
  findOneU(@Param('id') id: string) {
    return this.testService.findOneU(id);
  }

  @Get('instructor/:id')
  findOneI(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any)?.user;
    return this.testService.findOneI(id, (user as any)?.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(id);
  }

  // ----------------------------------------question---------------------------------------


  // ----------------------------------------sub-question---------------------------------------
  
  
  // ----------------------------------------user-submission---------------------------------------
  
  
  // ----------------------------------------test-evaluation---------------------------------------
}
