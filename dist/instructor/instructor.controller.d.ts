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
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { UploadService } from 'src/upload/upload.service';
import { MailDto, MultiMailDto } from './dto/mail.dto';
export declare class InstructorController {
    private readonly instructorService;
    private readonly uploadService;
    constructor(instructorService: InstructorService, uploadService: UploadService);
    deleteFolder(folderName: string): Promise<void>;
    sendEmail(MailDto: MailDto): Promise<any>;
    sendEmails(MultiMailDto: MultiMailDto[]): Promise<any>;
    create(createInstructorDto: CreateInstructorDto): Promise<import("mongoose").Document<unknown, {}, import("src/models/instructor.schema").InstructorDocument> & import("src/models/instructor.schema").Instructor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("src/models/instructor.schema").InstructorDocument> & import("src/models/instructor.schema").Instructor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("src/models/instructor.schema").InstructorDocument> & import("src/models/instructor.schema").Instructor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateInstructorDto: UpdateInstructorDto): Promise<import("mongoose").Document<unknown, {}, import("src/models/instructor.schema").InstructorDocument> & import("src/models/instructor.schema").Instructor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("src/models/instructor.schema").InstructorDocument> & import("src/models/instructor.schema").Instructor & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
