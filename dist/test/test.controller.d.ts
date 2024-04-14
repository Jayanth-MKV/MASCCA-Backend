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
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { updatePubDto, UpdateTestDto } from './dto/update-test.dto';
export declare class TestController {
    private readonly testService;
    constructor(testService: TestService);
    create(createTestDto: CreateTestDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("src/models/test.schema").TestDocument> & import("src/models/test.schema").Test & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getInviteLink(id: string): Promise<string>;
    getByIdAndSecret(getTestDto: any): Promise<{}>;
    findAll(req: Request): Promise<(import("mongoose").Document<unknown, {}, import("src/models/test.schema").TestDocument> & import("src/models/test.schema").Test & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findAllAv(): Promise<(import("mongoose").Document<unknown, {}, import("src/models/test.schema").TestDocument> & import("src/models/test.schema").Test & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findAllOngoing(req: Request): Promise<(import("mongoose").Document<unknown, {}, import("src/models/test.schema").TestDocument> & import("src/models/test.schema").Test & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOneU(id: string): Promise<{}>;
    findOneI(id: string, req: Request): Promise<{}>;
    update(id: string, updateTestDto: UpdateTestDto): Promise<import("mongoose").Document<unknown, {}, import("src/models/test.schema").TestDocument> & import("src/models/test.schema").Test & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    publishTest(id: string, updatePubDto: updatePubDto): Promise<import("mongoose").Document<unknown, {}, import("src/models/test.schema").TestDocument> & import("src/models/test.schema").Test & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("src/models/test.schema").TestDocument> & import("src/models/test.schema").Test & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
