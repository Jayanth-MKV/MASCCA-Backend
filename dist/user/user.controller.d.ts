/// <reference types="multer" />
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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { BadGatewayException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UploadService } from 'src/upload/upload.service';
import { StorageObjectDto } from 'src/upload/dto/storage-object.dto';
import { SubmissionService } from 'src/submission/submission.service';
import { getAudioDto } from './dto/getAudio.Dto';
export declare class UserController {
    private readonly userService;
    private readonly uploadService;
    private readonly submissionService;
    constructor(userService: UserService, uploadService: UploadService, submissionService: SubmissionService);
    uploadTrans(index: string, id: string, text: string): Promise<import("@nestjs/common").BadRequestException | import("@nestjs/common").NotFoundException | {
        message: string;
        data: any;
    }>;
    uploadFile(folder: string, index: string, id: string, data: StorageObjectDto, file: Express.Multer.File): Promise<import("@nestjs/common").BadRequestException | import("@nestjs/common").NotFoundException | (import("mongoose").Document<unknown, {}, import("src/models/usersubmission.schema").UserSubmissionDocument> & import("src/models/usersubmission.schema").UserSubmission & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | BadGatewayException>;
    getAudio(getaudDto: getAudioDto): Promise<Blob>;
    create(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("src/models/user.schema").UserDocument> & import("src/models/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("src/models/user.schema").UserDocument> & import("src/models/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("src/models/user.schema").UserDocument> & import("src/models/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, import("src/models/user.schema").UserDocument> & import("src/models/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("src/models/user.schema").UserDocument> & import("src/models/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
