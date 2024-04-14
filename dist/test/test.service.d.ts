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
import { InstructorService } from 'src/instructor/instructor.service';
import { Logger } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { updatePubDto, UpdateTestDto } from './dto/update-test.dto';
import { Test, TestDocument } from 'src/models/test.schema';
import { Model } from 'mongoose';
export declare class TestService {
    private readonly testModel;
    private readonly instructorService;
    logger: Logger;
    constructor(testModel: Model<TestDocument>, instructorService: InstructorService);
    createInviteLink(testId: string): Promise<string>;
    getByIdAndSecret(id: string, testSecret: string): Promise<{}>;
    create(createTestDto: CreateTestDto, id: string): Promise<import("mongoose").Document<unknown, {}, TestDocument> & Test & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(id: string): Promise<(import("mongoose").Document<unknown, {}, TestDocument> & Test & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findAllAvailable(): Promise<(import("mongoose").Document<unknown, {}, TestDocument> & Test & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findAllOng(id: string): Promise<(import("mongoose").Document<unknown, {}, TestDocument> & Test & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOneU(id: string): Promise<{}>;
    findOneI(id: string, uid: string): Promise<{}>;
    update(id: string, updateTestDto: UpdateTestDto): Promise<import("mongoose").Document<unknown, {}, TestDocument> & Test & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    publishTest(id: string, updatePubDto: updatePubDto): Promise<import("mongoose").Document<unknown, {}, TestDocument> & Test & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, TestDocument> & Test & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
