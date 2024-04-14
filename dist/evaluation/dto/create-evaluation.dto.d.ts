export declare class CreateEvaluationDto {
    submissionId: string;
    testId: string;
    userId: string;
}
export declare class SaveTextEvaluationDto {
    id: string;
    correctAnswer: Number;
    index: string;
    type: string;
    emotion: string;
}
export declare class SaveAudioEvaluationDto {
    id: string;
    audiofile: string;
    audiotext: string;
    index: string;
    type: string;
}
export declare class AudioReEvaluationDto {
    id: string;
    index: string;
}
export declare class TextReEvaluationDto {
    id: string;
    index: string;
}
