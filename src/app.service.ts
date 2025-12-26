import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!Hello World!Hello World!Hello World!Hello World!9999';
  }
  //获取文章列表
  getPostList(): string {
    return '获取文章列表';
  }
  //获取文章详情
  getPostDetail(): string {
    return '获取文章详情';
  }
  // 创建文章
  createPost(): string {
    return '创建文章';
  }
}
