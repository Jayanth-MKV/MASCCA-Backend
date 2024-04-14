import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { InstructorService } from 'src/instructor/instructor.service';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userService;
    private instructorService;
    private hashService;
    private jwtService;
    constructor(userService: UserService, instructorService: InstructorService, hashService: HashService, jwtService: JwtService);
    oAuthLogin(user: any): Promise<{
        access_token: string;
        user: {
            email: any;
            id: any;
            name: any;
            role: string;
            profile: any;
        };
    }>;
    oAuthLoginS(user: any): Promise<{
        access_token: string;
        user: {
            email: any;
            id: any;
            name: any;
            role: string;
            profile: any;
        };
    }>;
    validateUser(roll: string, pass: string): Promise<any>;
    validateIns(email: string, pass: string): Promise<any>;
    slogin(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            roll: any;
            email: any;
            role: string;
        };
    }>;
    ilogin(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: string;
        };
    }>;
}
