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
import { FRONTEND_URL, FRONTEND_URLS } from 'src/utils/constants';
import {  Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly instructorService: InstructorService,
    private readonly userService: UserService,
  ) {}




  @Get('callback/google/user')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallbackS(@Req() req, @Res() res: Response) {
    try {
      const token = await this.authService.oAuthLoginS(req.user);
      res.redirect(`${FRONTEND_URLS}/oauth?token=${token.access_token}&s_user=${JSON.stringify(token?.user)}`);
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  }


  @Get('callback/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req:Request, @Res() res: Response) {
    try {
      const token = await this.authService.oAuthLogin((req as any)?.user);
    
      // if(!token){
      //   res.redirect(`${req.url}/auth/register`);
      //   return;
      // }
      
      if(token?.user?.role=="STUDENT"){
        res.redirect(`${FRONTEND_URLS}/oauth?token=${token.access_token}&s_user=${JSON.stringify(token?.user)}`);
        return ;
      }
      else if(token?.user?.role=="INSTRUCTOR"){
        res.redirect(`${FRONTEND_URL}/oauth?token=${token.access_token}&i_user=${JSON.stringify(token?.user)}`);
        return ;
      }
      
      
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  }


  @Post('check-email')
  async checkiemail(@Body() email:{email:string}) {
   
    const e = await this.instructorService.getPassByEmail(email?.email);
    const u = await this.userService.getPassByEmail(email?.email);
    // console.log(e)
    if(!e && !u){
      return false;
    }
    
    return true;
  }

  @Post('check-roll')
  async checkRoll(@Body() roll:{roll:string}) {
   
    const e = await this.userService.getPassByRoll(roll?.roll);
    // console.log(e)
    if(!e){
      return false;
    }
    
    return true;
  }


  @Post('iregister')
  async Registeri(@Body() CreateInstructorDto: CreateInstructorDtoI) {
    CreateInstructorDto["type"] = "CRED";
    return await this.instructorService.registerInstructor(CreateInstructorDto as CreateInstructorDto);
  }

  @Post('sregister')
  async Registers(@Body() RegisterUserDto: RegisterUserDto) {
    RegisterUserDto["type"] = "CRED";
    return await this.userService.registerUser(RegisterUserDto);
  }

  @UseGuards(slocalAuthGuard)
  @Post('/slogin')
  async Slogin(@Body() data: sLoginDto, @Request() req: any) {
    console.log(req.user);
    return await this.authService.slogin(req?.user);
  }

  @UseGuards(ilocalAuthGuard)
  @Post('/ilogin')
  async Ilogin(@Body() data: iLoginDto, @Request() req: any
  // , @Res() res: Response
  ) {
    const  token =  await this.authService.ilogin(req?.user);
    // res.json(token);
    console.log(":::::",token)
    return token;
    // res.redirect(`${FRONTEND_URL}/oauth?token=${token.access_token}&i_user=${JSON.stringify(token?.user)}`);

  }
}
