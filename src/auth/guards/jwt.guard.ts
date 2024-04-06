import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class StudentAuthGuard extends AuthGuard('student') {

  constructor() {
    console.log("inside student auth guard")
    super();
  }

  canActivate(context: ExecutionContext) {
    // console.log("inside sag canActivate")
    // const req = context.switchToHttp().getRequest();
    // console.log(req.headers)
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    // Check if the user's role is 'student'
    if (user.role !== 'STUDENT') {
      throw new UnauthorizedException(
        'You do not have permission to access this resource.',
      );
    }

    console.log(user);
    return user;
  }
}

@Injectable()
export class InstructorAuthGuard extends AuthGuard('instructor') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    // Check if the user's role is 'instructor'
    if (user.role !== 'INSTRUCTOR') {
      throw new UnauthorizedException(
        'You do not have permission to access this resource.',
      );
    }

    // console.log(user);
    return user;
  }
}