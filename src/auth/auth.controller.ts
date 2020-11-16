import { Controller, Get, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { SSOAuthGuard } from './sso-auth.guard';
import { AuthService } from './auth.service';
import { LoginInterceptor } from './login.interceptor';
import { User } from '../common/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService
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
  @UseInterceptors(LoginInterceptor)
  async callback(@User() user: any) {
    return user;
  }
}
