import { iLoginDto, sLoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateInstructorDtoI } from 'src/instructor/dto/create-instructor.dto';
import { InstructorService } from 'src/instructor/instructor.service';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    private readonly instructorService;
    private readonly userService;
    constructor(authService: AuthService, instructorService: InstructorService, userService: UserService);
    googleAuthCallbackS(req: any, res: Response): Promise<void>;
    googleAuthCallback(req: any, res: Response): Promise<void>;
    checkiemail(email: {
        email: string;
    }): Promise<boolean>;
    checkRoll(roll: {
        roll: string;
    }): Promise<boolean>;
    Registeri(CreateInstructorDto: CreateInstructorDtoI): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        user: {
            email: string;
            id: any;
        };
    }>;
    Registers(RegisterUserDto: RegisterUserDto): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: {
            id: any;
        };
    }>;
    Slogin(data: sLoginDto, req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            roll: any;
            email: any;
            role: string;
        };
    }>;
    Ilogin(data: iLoginDto, req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: string;
        };
    }>;
}
