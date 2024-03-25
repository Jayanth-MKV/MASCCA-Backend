import { Injectable, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
      id: user._id,
      role: 'STUDENT',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async ilogin(user: any) {
    const payload = {
      email: user.email,
      id: user._id,
      role: 'INSTRUCTOR',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
