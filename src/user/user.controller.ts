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

@Controller('user')
@ApiTags('user')
// @UseGuards(StudentAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly uploadService: UploadService,
  ) {}



  @Get('/audio/:testid')
  async getData(@Param('testid') testid:string): Promise<any> {
    return this.uploadService.fetchDataFromSupabase(testid);
  }

  @Post('upload/:testid')
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
    console.log(file);
    console.log(folder);
    const uploadedData = await this.uploadService.uploadFileToSupabase(
      file,
      folder,
    );
    return uploadedData;
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
