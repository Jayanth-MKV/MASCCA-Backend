import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { SubmissionService } from './submission.service';


// check if submission id has submitted to false
@Injectable()
export class SubmissionInterceptor implements NestInterceptor {
  constructor(private readonly submissionService: SubmissionService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const id = req.body?.id || req.params?.id;

    if (!id) {
      throw new BadRequestException('ID is missing in request');
    }

    try {
      const submission = await this.submissionService.findOne(id);
      if (submission.submitted) {
        return of({ error: 'Submission is no longer accessible' }); // Non-accessible response
      } else {
        return next.handle();
      }
    } catch (error) {
      throw new BadRequestException('Invalid submission ID');
    }
  }
}
