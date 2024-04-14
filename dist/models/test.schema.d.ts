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
import { Document } from 'mongoose';
export declare class Test {
    title: string;
    about: string;
    instructions: string;
    guidelines: string;
    tandc: string;
    testSecret: string;
    keywords: string[];
    durationMinutes: number;
    startTime: Date;
    endTime: Date;
    createdBy: string;
    published: boolean;
}
export type TestDocument = Test & Document;
export declare const TestSchema: import("mongoose").Schema<Test, import("mongoose").Model<Test, any, any, any, Document<unknown, any, Test> & Test & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Test, Document<unknown, {}, import("mongoose").FlatRecord<Test>> & import("mongoose").FlatRecord<Test> & {
    _id: import("mongoose").Types.ObjectId;
}>;
