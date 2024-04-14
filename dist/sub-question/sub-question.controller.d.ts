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
import { SubQuestionService } from './sub-question.service';
import { UpdateSubQuestionDto } from './dto/update-sub-question.dto';
export declare class SubQuestionController {
    private readonly subQuestionService;
    constructor(subQuestionService: SubQuestionService);
    findAll(id: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/subquestion.schema").SubQuestionDocument> & import("src/models/subquestion.schema").SubQuestion & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOneU(id: string): Promise<import("mongoose").Document<unknown, {}, import("src/models/subquestion.schema").SubQuestionDocument> & import("src/models/subquestion.schema").SubQuestion & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneI(id: string, req: Request): Promise<import("mongoose").Document<unknown, {}, import("src/models/subquestion.schema").SubQuestionDocument> & import("src/models/subquestion.schema").SubQuestion & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateSubQuestionDto: UpdateSubQuestionDto): Promise<import("mongoose").Document<unknown, {}, import("src/models/subquestion.schema").SubQuestionDocument> & import("src/models/subquestion.schema").SubQuestion & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("src/models/subquestion.schema").SubQuestionDocument> & import("src/models/subquestion.schema").SubQuestion & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
