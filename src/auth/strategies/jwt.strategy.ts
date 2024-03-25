import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class StudentJWTStrategy extends PassportStrategy(Strategy, 'student') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
    console.log("inside student strategy");
    
  }
  
  async validate(payload: any) {
    console.log("inside student validate");
    console.log(payload);
    return {
      id: payload?.id,
      roll: payload?.roll,
      role:payload?.role
    };
  }
}

@Injectable()
export class InstructorJWTStrategy extends PassportStrategy(Strategy, 'instructor') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log(payload);
    return {
      id: payload?.id,
      email: payload?.email,
      role:payload?.role
    };
  }
}