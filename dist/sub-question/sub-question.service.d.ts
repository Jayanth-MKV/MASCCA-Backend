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
import { Logger } from '@nestjs/common';
import { SubQuestion, SubQuestionDocument } from 'src/models/subquestion.schema';
import { Model } from 'mongoose';
import { UpdateSubQuestionDto } from './dto/update-sub-question.dto';
export declare class SubQuestionService {
    private readonly subQuestionModel;
    logger: Logger;
    constructor(subQuestionModel: Model<SubQuestionDocument>);
    findAll(id: string): Promise<(import("mongoose").Document<unknown, {}, SubQuestionDocument> & SubQuestion & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOneU(id: string): Promise<import("mongoose").Document<unknown, {}, SubQuestionDocument> & SubQuestion & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneI(id: string, uid: string): Promise<import("mongoose").Document<unknown, {}, SubQuestionDocument> & SubQuestion & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateSubQuestionDto: UpdateSubQuestionDto): Promise<import("mongoose").Document<unknown, {}, SubQuestionDocument> & SubQuestion & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, SubQuestionDocument> & SubQuestion & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}