import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { flatMap, tap } from 'rxjs/internal/operators';

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    return from( new Promise((resolve, reject) =>
      req.logIn(req.user, (err) => err ? reject(err) : resolve())
    )).pipe(
      flatMap(() => next.handle())
    )
  }
}
