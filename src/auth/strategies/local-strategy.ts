import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class sLocalStrategy extends PassportStrategy(Strategy, 'slocal') {
  constructor(@Inject(AuthService) private authService: AuthService) {
    super({
      usernameField: 'roll',
      passwordField: 'password',
    });
    console.log('load slocal strategy');
  }

  async validate(roll: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(roll, password);
    if (!user) {
      throw new UnauthorizedException({
        message: 'You have entered a wrong roll or password',
      });
    }
    return user;
  }
}

@Injectable()
export class iLocalStrategy extends PassportStrategy(Strategy, 'ilocal') {
  constructor(@Inject(AuthService) private authService: AuthService) {
    super(
      {
        usernameField: 'email',
        passwordField: 'password',
      }
      );
    console.log('load ilocal strategy');
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('load ilocal validate');
    const user = await this.authService.validateIns(email, password);
    if (!user) {
      throw new UnauthorizedException({
        message: 'You have entered a wrong email or password',
      });
    }
    return user;
  }
}

