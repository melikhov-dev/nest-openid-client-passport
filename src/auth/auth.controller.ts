import { Controller, Get, UseGuards, Request, UseInterceptors, Session } from '@nestjs/common';
import { SSOAuthGuard } from './sso-auth.guard';
import { User } from '../common/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
  ) {
    console.log('AuthController created');
  }
  @Get('login')
  @UseGuards(SSOAuthGuard)
  login() {
    return
  }

  @Get('callback')
  @UseGuards(SSOAuthGuard)
  async callback(@User() user: any, @Session() session: Record<string, any>) {
    session.user = user;
    return user;
  }
}
