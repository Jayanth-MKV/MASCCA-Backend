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
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(createQuestionDto: CreateQuestionDto, req: any): Promise<(import("mongoose").Document<unknown, {}, import("src/models/question.schema").QuestionDocument> & import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[] | {
        message: string;
    }>;
    findAllI(id: string): Promise<any[]>;
    findAllU(id: string): Promise<any[]>;
    findOneI(id: string, req: Request): Promise<{
        subquestion: (import("mongoose").Document<unknown, {}, import("src/models/subquestion.schema").SubQuestionDocument> & import("src/models/subquestion.schema").SubQuestion & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        _id: any;
        __v?: any;
        $locals: Record<string, unknown>;
        $model: {
            <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType;
            <ModelType_1 = import("mongoose").Model<import("src/models/question.schema").QuestionDocument, {}, {}, {}, import("mongoose").Document<unknown, {}, import("src/models/question.schema").QuestionDocument> & import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            }, any>>(): ModelType_1;
        } & {
            <ModelType_2 = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType_2;
            <ModelType_3 = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType_3;
        };
        $op: "remove" | "save" | "validate";
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection<import("bson").Document>;
        db: import("mongoose").Connection;
        deleteOne: ((options?: import("mongoose").QueryOptions<unknown>) => import("mongoose").Query<import("mongodb").DeleteResult, import("mongoose").Document<unknown, {}, import("src/models/question.schema").QuestionDocument> & import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, {}, import("src/models/question.schema").QuestionDocument, "deleteOne">) & ((options?: import("mongoose").QueryOptions<unknown>) => any);
        equals: ((doc: import("mongoose").Document<unknown, any, any>) => boolean) & ((doc: import("mongoose").Document<any, any, any>) => boolean);
        errors?: import("mongoose").Error.ValidationError;
        get: {
            <T extends keyof import("src/models/question.schema").Question | keyof import("mongoose").Document<any, any, any>>(path: T, type?: any, options?: any): import("src/models/question.schema").QuestionDocument[T];
            (path: string, type?: any, options?: any): any;
        } & {
            <T_1 extends string | number | symbol>(path: T_1, type?: any, options?: any): any;
            (path: string, type?: any, options?: any): any;
        };
        id?: any;
        invalidate: {
            <T_2 extends keyof import("src/models/question.schema").Question | keyof import("mongoose").Document<any, any, any>>(path: T_2, errorMsg: string | NativeError, value?: any, kind?: string): NativeError;
            (path: string, errorMsg: string | NativeError, value?: any, kind?: string): NativeError;
        } & {
            <T_3 extends string | number | symbol>(path: T_3, errorMsg: string | NativeError, value?: any, kind?: string): NativeError;
            (path: string, errorMsg: string | NativeError, value?: any, kind?: string): NativeError;
        };
        isDirectModified: {
            <T_4 extends keyof import("src/models/question.schema").Question | keyof import("mongoose").Document<any, any, any>>(path: T_4 | T_4[]): boolean;
            (path: string | string[]): boolean;
        } & {
            <T_5 extends string | number | symbol>(path: T_5 | T_5[]): boolean;
            (path: string | string[]): boolean;
        };
        isDirectSelected: {
            <T_6 extends keyof import("src/models/question.schema").Question | keyof import("mongoose").Document<any, any, any>>(path: T_6): boolean;
            (path: string): boolean;
        } & {
            <T_7 extends string | number | symbol>(path: T_7): boolean;
            (path: string): boolean;
        };
        isInit: {
            <T_8 extends keyof import("src/models/question.schema").Question | keyof import("mongoose").Document<any, any, any>>(path: T_8): boolean;
            (path: string): boolean;
        } & {
            <T_9 extends string | number | symbol>(path: T_9): boolean;
            (path: string): boolean;
        };
        isModified: {
            <T_10 extends keyof import("src/models/question.schema").Question | keyof import("mongoose").Document<any, any, any>>(path?: T_10 | T_10[], options?: {
                ignoreAtomics?: boolean;
            }): boolean;
            (path?: string | string[], options?: {
                ignoreAtomics?: boolean;
            }): boolean;
        } & {
            <T_11 extends string | number | symbol>(path?: T_11 | T_11[], options?: {
                ignoreAtomics?: boolean;
            }): boolean;
            (path?: string | string[], options?: {
                ignoreAtomics?: boolean;
            }): boolean;
        };
        isNew: boolean;
        isSelected: {
            <T_12 extends keyof import("src/models/question.schema").Question | keyof import("mongoose").Document<any, any, any>>(path: T_12): boolean;
            (path: string): boolean;
        } & {
            <T_13 extends string | number | symbol>(path: T_13): boolean;
            (path: string): boolean;
        };
        markModified: {
            <T_14 extends keyof import("src/models/question.schema").Question | keyof import("mongoose").Document<any, any, any>>(path: T_14, scope?: any): void;
            (path: string, scope?: any): void;
        } & {
            <T_15 extends string | number | symbol>(path: T_15, scope?: any): void;
            (path: string, scope?: any): void;
        };
        model: {
            <ModelType_4 = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType_4;
            <ModelType_5 = import("mongoose").Model<import("src/models/question.schema").QuestionDocument, {}, {}, {}, import("mongoose").Document<unknown, {}, import("src/models/question.schema").QuestionDocument> & import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            }, any>>(): ModelType_5;
        } & {
            <ModelType_6 = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType_6;
            <ModelType_7 = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType_7;
        };
        schema: import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            [x: string]: unknown;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            [x: string]: unknown;
        }>> & import("mongoose").FlatRecord<{
            [x: string]: unknown;
        }> & Required<{
            _id: unknown;
        }>>;
        set: {
            <T_16 extends keyof import("src/models/question.schema").Question | keyof import("mongoose").Document<any, any, any>>(path: T_16, val: import("src/models/question.schema").QuestionDocument[T_16], type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("src/models/question.schema").QuestionDocument> & import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("src/models/question.schema").QuestionDocument> & import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("src/models/question.schema").QuestionDocument> & import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (value: string | Record<string, any>): import("mongoose").Document<unknown, {}, import("src/models/question.schema").QuestionDocument> & import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
        } & {
            <T_17 extends string | number | symbol>(path: T_17, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("src/models/question.schema").QuestionDocument> & import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("src/models/question.schema").QuestionDocument> & import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("src/models/question.schema").QuestionDocument> & import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (value: string | Record<string, any>): import("mongoose").Document<unknown, {}, import("src/models/question.schema").QuestionDocument> & import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
        };
        toJSON: {
            <T_18 = import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            }>(options?: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>> & {
                flattenMaps?: true;
            }): import("mongoose").FlattenMaps<T_18>;
            <T_19 = import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            }>(options: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>> & {
                flattenMaps: false;
            }): T_19;
        } & {
            <T_20 = any>(options?: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>> & {
                flattenMaps?: true;
            }): import("mongoose").FlattenMaps<T_20>;
            <T_21 = any>(options: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>> & {
                flattenMaps: false;
            }): T_21;
        };
        toObject: (<T_22 = import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }>(options?: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
            _id: unknown;
        }>>) => import("mongoose").Require_id<T_22>) & (<T_23 = any>(options?: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
            _id: unknown;
        }>>) => import("mongoose").Require_id<T_23>);
        unmarkModified: {
            <T_24 extends keyof import("src/models/question.schema").Question | keyof import("mongoose").Document<any, any, any>>(path: T_24): void;
            (path: string): void;
        } & {
            <T_25 extends string | number | symbol>(path: T_25): void;
            (path: string): void;
        };
        validate: {
            <T_26 extends keyof import("src/models/question.schema").Question | keyof import("mongoose").Document<any, any, any>>(pathsToValidate?: T_26 | T_26[], options?: import("mongoose").AnyObject): Promise<void>;
            (pathsToValidate?: import("mongoose").PathsToValidate, options?: import("mongoose").AnyObject): Promise<void>;
            (options: {
                pathsToSkip?: import("mongoose").pathsToSkip;
            }): Promise<void>;
        } & {
            <T_27 extends string | number | symbol>(pathsToValidate?: T_27 | T_27[], options?: import("mongoose").AnyObject): Promise<void>;
            (pathsToValidate?: import("mongoose").PathsToValidate, options?: import("mongoose").AnyObject): Promise<void>;
            (options: {
                pathsToSkip?: import("mongoose").pathsToSkip;
            }): Promise<void>;
        };
        validateSync: {
            (options: {
                [k: string]: any;
                pathsToSkip?: import("mongoose").pathsToSkip;
            }): import("mongoose").Error.ValidationError;
            <T_28 extends keyof import("src/models/question.schema").Question | keyof import("mongoose").Document<any, any, any>>(pathsToValidate?: T_28 | T_28[], options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError;
            (pathsToValidate?: import("mongoose").PathsToValidate, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError;
        } & {
            (options: {
                [k: string]: any;
                pathsToSkip?: import("mongoose").pathsToSkip;
            }): import("mongoose").Error.ValidationError;
            <T_29 extends string | number | symbol>(pathsToValidate?: T_29 | T_29[], options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError;
            (pathsToValidate?: import("mongoose").PathsToValidate, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError;
        };
        testId: string;
        createdBy: string;
        topic: string;
        content: string;
    }>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<import("mongoose").Document<unknown, {}, import("src/models/question.schema").QuestionDocument> & import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("src/models/question.schema").QuestionDocument> & import("src/models/question.schema").Question & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
