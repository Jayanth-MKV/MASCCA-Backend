import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  BadGatewayException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { StudentAuthGuard } from 'src/auth/guards/jwt.guard';
import { UploadService } from 'src/upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageObjectDto } from 'src/upload/dto/storage-object.dto';
import { SubmissionService } from 'src/submission/submission.service';
import { getAudioDto } from './dto/getAudio.Dto';

@Controller('user')
@ApiTags('user')
// @UseGuards(StudentAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly uploadService: UploadService,
    private readonly submissionService: SubmissionService
  ) {}



  // @Get('/audio/:testid')
  // async getData(@Param('testid') testid:string): Promise<any> {
  //   return this.uploadService.fetchDataFromSupabase(testid);
  // }

  @Post('submit/audio/:testid/:index/:id')
  @ApiParam({
    name: 'testid',
    description: 'folder name - Test ID',
    type: 'string',
    schema: {
      example: '123-123-123-123',
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('testid') folder: string,
    @Param('index') index: string,
    @Param('id') id: string,
    @Body() data: StorageObjectDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /\**.(wav|mp3|aiff|ogg)$/ }),
        ],
      })
    )
    file: Express.Multer.File,
  ) {
    // console.log(index);
    // console.log(id);
    // console.log(folder);
    const uploadedData = await this.uploadService.uploadFileToSupabase(
      file,
      folder,
      index,
      id
    );

    if(!uploadedData || !uploadedData?.fullPath){
 return new BadGatewayException("file not uploaded")
    }

    const sa = await this.submissionService.saveAudio({id:id,index,type:"AUDIO",audiofile:uploadedData?.fullPath,audiotext:data.text})
    return sa;
  }

  /*
  Response body
{
  "path": "123-123-123-123/1711951742724_1322-1231-2312-312_OAF_back_happy.wav",
  "id": "004b6e0e-5942-4b7c-a4ed-4345e764e73b",
  "fullPath": "audio/123-123-123-123/1711951742724_1322-1231-2312-312_OAF_back_happy.wav"
}
*/


@Post('/getaudiofile')
getAudio(@Body() getaudDto: getAudioDto) {
  return this.uploadService.downloadFileFromSupabase(getaudDto.filePath);
}


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
