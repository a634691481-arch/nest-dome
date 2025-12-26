import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 装饰器可以理解为一个封装好的函数，  其实就是一个语法糖
@Module({
  controllers: [AppController],
  providers: [AppService],

  // providers（提供者）：理解为"工具箱"，里面放着各种业务逻辑处理类（服务类）
  //   - 比如数据库操作、文件处理、邮件发送等具体功能
  //   - 这些服务可以在整个应用中共享使用（通过依赖注入机制）

  // controllers（控制器）：理解为"接待员"，专门负责处理HTTP请求
  //   - 接收客户端的请求（GET、POST等）
  //   - 调用providers中的服务来处理业务逻辑
  //   - 将处理结果返回给客户端

  // imports（导入模块）：理解为"引入外部资源"
  //   - 当你需要使用其他模块提供的功能时，在这里导入
  //   - 例如：需要数据库功能就导入DatabaseModule

  // exports（导出服务）：理解为"对外开放"
  //   - 把当前模块的某些服务开放给其他模块使用
  //   - 如果不导出，其他模块就无法使用这个服务

  //   app.controller → 前端的「页面 / 接口路由文件」（管 “前端能调哪些接口”）
  // app.service → 前端的「utils 工具函数文件」（管 “接口里的业务逻辑”）
  // app.module → 前端的「main.js/ 入口配置文件」（管 “把上面两个文件组装起来”）
})
export class AppModule {}
