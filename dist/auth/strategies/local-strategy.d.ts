import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const sLocalStrategy_base: new (...args: any[]) => Strategy;
export declare class sLocalStrategy extends sLocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(roll: string, password: string): Promise<any>;
}
declare const iLocalStrategy_base: new (...args: any[]) => Strategy;
export declare class iLocalStrategy extends iLocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<any>;
}
export {};
