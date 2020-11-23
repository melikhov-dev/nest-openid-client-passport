import { Controller, Get, Redirect, Request, Response, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './common/user.decorator';
import { UserGuard } from './common/user.guard';
import { AuthFilter } from './common/auth.filter';

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
  @UseGuards(UserGuard)
  test(@User() user: any) {
    return user;
  }
}
