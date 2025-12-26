// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/getPostList')
  getPostList(): string {
    return this.appService.getPostList();
  }
  @Get('/getPostDetail')
  getPostDetail(): string {
    return this.appService.getPostDetail();
  }
  @Get('/createPost')
  createPost(): string {
    return this.appService.createPost();
  }
}
