import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { iLoginDto, sLoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ilocalAuthGuard, slocalAuthGuard } from './guards/local.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateInstructorDto } from 'src/instructor/dto/create-instructor.dto';
import { InstructorService } from 'src/instructor/instructor.service';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly instructorService: InstructorService,
    private readonly userService: UserService,
  ) {}

  @Post('iregister')
  Registeri(@Body() CreateInstructorDto: CreateInstructorDto) {
    return this.instructorService.registerInstructor(CreateInstructorDto);
  }

  @Post('sregister')
  Registers(@Body() RegisterUserDto: RegisterUserDto) {
    return this.userService.registerUser(RegisterUserDto);
  }

  @UseGuards(slocalAuthGuard)
  @Post('/slogin')
  async Slogin(@Body() data: sLoginDto, @Request() req: any) {
    console.log(req.user);
    return await this.authService.slogin(req?.user);
  }

  @UseGuards(ilocalAuthGuard)
  @Post('/ilogin')
  async Ilogin(@Body() data: iLoginDto, @Request() req: any) {
    return await this.authService.ilogin(req?.user);
  }
}
