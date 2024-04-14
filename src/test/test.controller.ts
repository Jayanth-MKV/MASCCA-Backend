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
  Query,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { updatePubDto, UpdateTestDto } from './dto/update-test.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { InstructorAuthGuard, StudentAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('test')
// @ApiTags('test')
@ApiTags('instructor')
@ApiBearerAuth()
export class TestController {
  constructor(private readonly testService: TestService) { }

  // ----------------------------------------test---------------------------------------


  @Post('create')
  @UseGuards(InstructorAuthGuard)
  async create(@Body() createTestDto: CreateTestDto, @Req() req: any) {
    const id = req?.user?.id;
    //console.log(id)
    return await this.testService.create(createTestDto, id);
  }

  @Get('invitelink/:testid')
  @UseGuards(InstructorAuthGuard)
  async getInviteLink(@Param('testid') id: string) {

    return await this.testService.createInviteLink(id);
  }

  @Post('taketest')
  @ApiTags('user')
  @UseGuards(StudentAuthGuard)
  async getByIdAndSecret(@Body() getTestDto: any) {
    console.log("take test")
    console.log(getTestDto)
    return await this.testService.getByIdAndSecret(getTestDto.id, getTestDto.testSecret);
  }

  @Get('instructor/mytests')
  @UseGuards(InstructorAuthGuard)
  async findAll(@Req() req: Request) {
    const user = (req as any)?.user;

    return await this.testService.findAll(user?.id);
  }

  @Get('all')
  @UseGuards(StudentAuthGuard)
  async findAllAv() {
    return await this.testService.findAllAvailable();
  }

  @Get('instructor/mytests/ongoing')
  @UseGuards(InstructorAuthGuard)
  async findAllOngoing(@Req() req: Request) {
    const user = (req as any)?.user;

    return await this.testService.findAllOng(user?.id);
  }
  // @Get(':instId')
  // findAll(@Param('instId') instId:string ) {
  //   return this.testService.findAll(instId);
  // }

  @ApiTags('user')
  @Get('user/:testid')
  @UseGuards(StudentAuthGuard)
  async findOneU(@Param('testid') id: string) {
    const u = await this.testService.findOneU(id);
    return u;
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
    console.log(updateTestDto)
    return this.testService.update(id, updateTestDto);
  }

  @Patch('publish/:id')
  @UseGuards(InstructorAuthGuard)
  publishTest(@Param('id') id: string, @Body() updatePubDto: updatePubDto) {
    console.log(id)
    console.log(updatePubDto)
    return this.testService.publishTest(id, updatePubDto);
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
