import { ConfigService } from "@nestjs/config";
import { Strategy } from 'passport-jwt';
declare const StudentJWTStrategy_base: new (...args: any[]) => Strategy;
export declare class StudentJWTStrategy extends StudentJWTStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        id: any;
        roll: any;
        role: any;
    }>;
}
declare const InstructorJWTStrategy_base: new (...args: any[]) => Strategy;
export declare class InstructorJWTStrategy extends InstructorJWTStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        id: any;
        email: any;
        role: any;
    }>;
}
export {};
