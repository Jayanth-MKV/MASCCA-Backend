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
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { TestEvaluation, TestEvaluationDocument } from 'src/models/testevaluation.schema';
import { Model } from 'mongoose';
import { SubmissionService } from 'src/submission/submission.service';
import { UploadService } from 'src/upload/upload.service';
export declare class EvaluationService {
    private readonly evaluationModel;
    private readonly submissionService;
    private readonly uploadService;
    logger: Logger;
    constructor(evaluationModel: Model<TestEvaluationDocument>, submissionService: SubmissionService, uploadService: UploadService);
    EvalTextemotion(id: string, index: string): Promise<BadRequestException | NotFoundException | (import("mongoose").Document<unknown, {}, TestEvaluationDocument> & TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    getAudioEmotion(id: string, index: string): Promise<BadRequestException | NotFoundException | (import("mongoose").Document<unknown, {}, TestEvaluationDocument> & TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    create(createEvaluationDto: CreateEvaluationDto): Promise<import("mongoose").Document<unknown, {}, TestEvaluationDocument> & TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(id: string): Promise<(import("mongoose").Document<unknown, {}, TestEvaluationDocument> & TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, TestEvaluationDocument> & TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneSubId(id: string): Promise<import("mongoose").Document<unknown, {}, TestEvaluationDocument> & TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    evalTest(id: string): Promise<NotFoundException | (import("mongoose").Document<unknown, {}, TestEvaluationDocument> & TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    getResults(id: string, reload?: boolean): Promise<{
        testConfidence: string;
        confidenceLevel: string;
        questions: Number[];
        eval: import("mongoose").Document<unknown, {}, TestEvaluationDocument> & TestEvaluation & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    } | {
        testConfidence: number;
        confidenceLevel: string;
        questions: number[];
        eval: import("mongoose").Document<unknown, {}, TestEvaluationDocument> & TestEvaluation & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    private getEmotionValue;
    private getConfidenceLevel;
    updateById(id: string, updateEvaluationDto: UpdateEvaluationDto): Promise<import("mongoose").UpdateWriteOpResult>;
    updateBySubId(id: string, index: number, updateEvaluationDto: UpdateEvaluationDto): Promise<BadRequestException | NotFoundException | (import("mongoose").Document<unknown, {}, TestEvaluationDocument> & TestEvaluation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    remove(id: string): Promise<string>;
}
