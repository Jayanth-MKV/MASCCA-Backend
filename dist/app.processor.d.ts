import { UploadService } from 'src/upload/upload.service';
import { Job } from 'bull';
import { DoneCallback } from 'bull';
import { EvaluationService } from './evaluation/evaluation.service';
interface jobInterface {
    id: string;
    audiofileurl?: string;
    index: number;
    emotion?: string;
    time?: string;
}
export default function (job: Job, cb: DoneCallback): void;
export declare class AudioProcessor {
    private readonly evaluationService;
    private readonly uploadService;
    constructor(evaluationService: EvaluationService, uploadService: UploadService);
    getAudioEmotion(job: Job<jobInterface>): Promise<void>;
    saveTextemotion(job: Job<jobInterface>): Promise<void>;
    testSubmitted(job: Job<jobInterface>): Promise<void>;
}
export {};
