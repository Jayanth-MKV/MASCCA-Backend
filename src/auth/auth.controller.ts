import { Body, Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { iLoginDto, sLoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ilocalAuthGuard, slocalAuthGuard } from './guards/local.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateInstructorDto, CreateInstructorDtoI } from 'src/instructor/dto/create-instructor.dto';
import { InstructorService } from 'src/instructor/instructor.service';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { FRONTEND_URL } from 'src/utils/constants';
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly instructorService: InstructorService,
    private readonly userService: UserService,
  ) {}






  @Get('callback/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const token = await this.authService.oAuthLogin(req.user);
      res.redirect(`${FRONTEND_URL}/oauth?token=${token.access_token}&i_user=${JSON.stringify(token?.user)}`);
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  }



  @Post('iregister')
  Registeri(@Body() CreateInstructorDto: CreateInstructorDtoI) {
    CreateInstructorDto["type"] = "CRED";
    return this.instructorService.registerInstructor(CreateInstructorDto as CreateInstructorDto);
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
  async Ilogin(@Body() data: iLoginDto, @Request() req: any, @Res() res: Response) {
   try{
    const token = await this.authService.ilogin(req?.user);
    res.redirect(`${FRONTEND_URL}/oauth?token=${token.access_token}&i_user=${JSON.stringify(token?.user)}`);
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
  }
}
