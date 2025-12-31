import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { UserModule } from './modules/user/user.module'
import { OrderModule } from './modules/order/order.module'
import { DatabaseModule } from './infrastructure/database/database.module'

@Module({
  imports: [
    // 配置模块，全局可用
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
      // validationSchema: validationSchema, // 可选：启用环境变量验证
    }),
    // 基础设施层
    DatabaseModule,
    // 业务模块
    UserModule,
    OrderModule
  ]
})
export class AppModule {}
//
//
//
//
//
//
//
//
//

// providers（提供者）：理解为"工具箱"，里面放着各种业务逻辑处理类（服务类）
//   - 比如数据库操作、文件处理、邮件发送等具体功能
//   - 这些服务可以在整个应用中共享使用（通过依赖注入机制）
//
//

// controllers（控制器）：理解为"接待员"，专门负责处理HTTP请求
//   - 接收客户端的请求（GET、POST等）
//   - 调用providers中的服务来处理业务逻辑
//   - 将处理结果返回给客户端
//
//
// imports（导入模块）：理解为"引入外部资源"
//   - 当你需要使用其他模块提供的功能时，在这里导入
//   - 例如：需要数据库功能就导入DatabaseModule
//
//

// exports（导出服务）：理解为"对外开放"
//   - 把当前模块的某些服务开放给其他模块使用
//   - 如果不导出，其他模块就无法使用这个服务
//
//

// app.controller → 前端的「页面 / 接口路由文件」（管 “前端能调哪些接口”）
// app.service → 前端的「utils 工具函数文件」（管 “接口里的业务逻辑”）
// app.module → 前端的「main.js/ 入口配置文件」（管 “把上面两个文件组装起来”）
// 你的理解完全精准！这就是 Nest.js 核心的 “分层思想”，和前端把「接口请求定义」与「业务逻辑处理」分开写的思路一模一样，我
//
//

// controller 只做 “转发”，不写逻辑：
// 每个 controller 里的接口方法，唯一的作用就是 “接住前端请求 → 把参数传给 service → 把 service 的结果返回给前端”，
// 自己绝不写具体逻辑（比如查数据库、校验参数）。
// 逻辑全放在 service 里：
// 对应接口的业务逻辑（比如新增用户要连数据库、查订单要过滤数据），全写在 service 里
// 核心目的：逻辑和定义分离：
// 这样拆分的好处和前端 “抽离工具函数” 完全一样：
//
//
//
// 易维护：改接口路径只动 controller，改业务逻辑只动 service，不用到处找代码；
// 易复用：多个接口需要同一个逻辑（比如 “校验手机号”），直接调用同一个 service 方法就行，不用重复写；
// 易测试：单独测 service 里的逻辑，不用管前端请求，就像前端单独测 utils 函数一样。

//
//
// 执行顺序（辅助理解）：前端请求 → 中间件 → 守卫 → 管道 → 控制器 → 提供者 → 拦截器（处理响应）→ 异常过滤器（捕获错误）→ 返回前端。
// 守卫（权限）+   管道（数据校验） + 异常过滤器（错误处理）
// 中间件 请求到达控制器之前、响应返回前端之前，做 “通用预处理 / 后处理”，比如打印日志、跨域处理、请求头修改。
//
//
//
// 步骤2：定义第一个类实现接口  Dog  这个类  必须实现 Animal 接口中的所有属性和方法
// class Dog implements Animal
//
//
//
//
//
// private readonly userService: UserService // 类类型约束
//内部访问  只读  构造函数  构造函数的约定
