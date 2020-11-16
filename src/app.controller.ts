import { Controller, Get, Redirect, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './common/user.decorator';
import { Response as Res } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log('AppController created');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  @Redirect()
  test(@User() user: any, @Response() res: Res) {
    if (!user) {
      res.redirect('/auth/login')
    }
    return res.end(user);
  }
}
