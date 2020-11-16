import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    await new Promise((resolve, reject) => {
      req.logIn(req.user, (err) => err ? reject(err) : resolve())
    })
    return next.handle();
  }
}
