export declare class HashService {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: any): Promise<boolean>;
}
