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
import { EvaluationService } from './evaluation.service';
import { AudioReEvaluationDto, CreateEvaluationDto, TextReEvaluationDto } from './dto/create-evaluation.dto';
export declare class EvaluationController {
    private readonly evaluationService;
    constructor(evaluationService: EvaluationService);
    create(createEvaluationDto: CreateEvaluationDto): Promise<import("mongoose").Document<unknown, {}, import("src/models/testevaluation.schema").TestEvaluationDocument> & import("src/models/testevaluation.schema").TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAudiEmo(data: AudioReEvaluationDto): Promise<import("@nestjs/common").BadRequestException | import("@nestjs/common").NotFoundException | (import("mongoose").Document<unknown, {}, import("src/models/testevaluation.schema").TestEvaluationDocument> & import("src/models/testevaluation.schema").TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    gettextEmo(data: TextReEvaluationDto): Promise<import("@nestjs/common").BadRequestException | import("@nestjs/common").NotFoundException | (import("mongoose").Document<unknown, {}, import("src/models/testevaluation.schema").TestEvaluationDocument> & import("src/models/testevaluation.schema").TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    testReval(id: string): Promise<import("@nestjs/common").NotFoundException | (import("mongoose").Document<unknown, {}, import("src/models/testevaluation.schema").TestEvaluationDocument> & import("src/models/testevaluation.schema").TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    findOnebysubId(id: string): Promise<import("mongoose").Document<unknown, {}, import("src/models/testevaluation.schema").TestEvaluationDocument> & import("src/models/testevaluation.schema").TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneId(id: string): Promise<import("mongoose").Document<unknown, {}, import("src/models/testevaluation.schema").TestEvaluationDocument> & import("src/models/testevaluation.schema").TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOnetId(id: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/testevaluation.schema").TestEvaluationDocument> & import("src/models/testevaluation.schema").TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getResults(id: string): Promise<{
        testConfidence: string;
        confidenceLevel: string;
        questions: Number[];
        eval: import("mongoose").Document<unknown, {}, import("src/models/testevaluation.schema").TestEvaluationDocument> & import("src/models/testevaluation.schema").TestEvaluation & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    } | {
        testConfidence: number;
        confidenceLevel: string;
        questions: number[];
        eval: import("mongoose").Document<unknown, {}, import("src/models/testevaluation.schema").TestEvaluationDocument> & import("src/models/testevaluation.schema").TestEvaluation & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getResultsReload(id: string): Promise<{
        testConfidence: string;
        confidenceLevel: string;
        questions: Number[];
        eval: import("mongoose").Document<unknown, {}, import("src/models/testevaluation.schema").TestEvaluationDocument> & import("src/models/testevaluation.schema").TestEvaluation & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    } | {
        testConfidence: number;
        confidenceLevel: string;
        questions: number[];
        eval: import("mongoose").Document<unknown, {}, import("src/models/testevaluation.schema").TestEvaluationDocument> & import("src/models/testevaluation.schema").TestEvaluation & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    findAllIns(id: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/testevaluation.schema").TestEvaluationDocument> & import("src/models/testevaluation.schema").TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
