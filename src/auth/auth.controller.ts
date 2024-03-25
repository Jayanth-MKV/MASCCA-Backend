import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { iLoginDto, sLoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ilocalAuthGuard, slocalAuthGuard } from './guards/local.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
