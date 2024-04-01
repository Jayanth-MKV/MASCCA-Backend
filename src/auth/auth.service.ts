import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { profile } from 'console';
import { HashService } from 'src/hash/hash.service';
import { InstructorService } from 'src/instructor/instructor.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private instructorService: InstructorService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}





  async oAuthLogin(user) {
    if (!user) {
      throw new Error('User not found!!!');
    }

    // check if Instructor exists
    const Instructor = await this.instructorService.findByEmail(user.email);

    if (!Instructor) {
      const inst = await this.instructorService.registerInstructor({
        name:user.name,
        email:user.email,
        Department:"NULL",
        password:"",
        type:"GOOGLE"
      });
    }

    const payload = {
      email: user.email,
      name: user.name,
      role: 'INSTRUCTOR',
      profile:user?.picture
    };

    const jwt = this.jwtService.sign(payload);

    return { 
      access_token:jwt,
      user:payload
     };
  }


  async validateUser(roll: string, pass: string): Promise<any> {
    const user = await this.userService.getPassByRoll(roll);
    if (user && (await this.hashService.comparePassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  async validateIns(email: string, pass: string): Promise<any> {
    const user = await this.instructorService.getPassByEmail(email);
    if (user && (await this.hashService.comparePassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  async slogin(user: any) {
    const payload = {
      roll: user.roll,
      email: user.email,
      role: 'STUDENT',
    };
    return {
      access_token: this.jwtService.sign(payload),
      user:payload
    };
  }

  async ilogin(user: any) {
    const payload = {
      email: user.email,
      name:user.name,
      role: 'INSTRUCTOR',
    };
    return {
      access_token: this.jwtService.sign(payload),
      user:payload
    };
  }
}
