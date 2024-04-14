import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SubmissionService } from './submission.service';
export declare class SubmissionInterceptor implements NestInterceptor {
    private readonly submissionService;
    constructor(submissionService: SubmissionService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
