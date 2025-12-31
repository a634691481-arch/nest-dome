export class Utils {
  //获取当前时间
  static getCurrentTime(): string {
    return new Date().toLocaleString()
  }
  // 生成随机字符串
  static getRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
    return result
  }
}
