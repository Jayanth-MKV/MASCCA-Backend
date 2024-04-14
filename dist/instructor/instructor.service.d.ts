/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { HttpStatus, Logger } from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { Instructor, InstructorDocument } from 'src/models/instructor.schema';
import { HashService } from 'src/hash/hash.service';
import { Model } from 'mongoose';
import { MailDto, MultiMailDto } from './dto/mail.dto';
import { UserService } from 'src/user/user.service';
export declare class InstructorService {
    private instructorModel;
    private hashService;
    private readonly userService;
    logger: Logger;
    constructor(instructorModel: Model<InstructorDocument>, hashService: HashService, userService: UserService);
    sendInviteEmail(data: MailDto): Promise<any>;
    sendMultipleInviteEmails(data: MultiMailDto[]): Promise<any>;
    registerInstructor(CreateCreateInstructorDto: CreateInstructorDto): Promise<{
        message: string;
        status: HttpStatus;
        user: {
            email: string;
            id: any;
        };
    }>;
    create(createinstructorDto: CreateInstructorDto): Promise<import("mongoose").Document<unknown, {}, InstructorDocument> & Instructor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, InstructorDocument> & Instructor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, InstructorDocument> & Instructor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPassByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, InstructorDocument> & Instructor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByDepartment(department: string): Promise<import("mongoose").Document<unknown, {}, InstructorDocument> & Instructor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, InstructorDocument> & Instructor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateinstructorDto: UpdateInstructorDto): Promise<import("mongoose").Document<unknown, {}, InstructorDocument> & Instructor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, InstructorDocument> & Instructor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
