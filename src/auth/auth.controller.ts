import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { SSOAuthGuard } from './sso-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(SSOAuthGuard)
  login() {
    return
  }

  @Get('callback')
  @UseGuards(SSOAuthGuard)
  async callback(@Request() req: any) {
    await new Promise((resolve, reject) => {
      req.logIn(req.user, (err) => err ? reject(err) : resolve())
    })
    return req.user;
  }
}
