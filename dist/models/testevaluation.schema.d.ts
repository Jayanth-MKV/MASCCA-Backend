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
export declare class TestEvaluation {
    submissionId: string;
    testId: string;
    userId: string;
    testConfidence: string;
    results: [
        {
            question_confidence: Number;
            correctAnswer: boolean;
            audioEmotion: string;
            videoEmotion: string;
            audiotextRelevancy: Number;
            time: String;
        }
    ];
}
export type TestEvaluationDocument = TestEvaluation & Document;
export declare const TestEvaluationSchema: import("mongoose").Schema<TestEvaluation, import("mongoose").Model<TestEvaluation, any, any, any, Document<unknown, any, TestEvaluation> & TestEvaluation & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TestEvaluation, Document<unknown, {}, import("mongoose").FlatRecord<TestEvaluation>> & import("mongoose").FlatRecord<TestEvaluation> & {
    _id: import("mongoose").Types.ObjectId;
}>;
