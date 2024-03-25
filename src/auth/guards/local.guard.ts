import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class slocalAuthGuard extends AuthGuard('slocal') {
}

@Injectable()
export class ilocalAuthGuard extends AuthGuard('ilocal') {
}
