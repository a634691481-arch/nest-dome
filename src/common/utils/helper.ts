/**
 * 通用分页辅助函数
 */
export function paginate<T>(data: T[], page: number, limit: number) {
  const totalPages = Math.ceil(data.length / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return {
    data: data.slice(startIndex, endIndex),
    total: data.length,
    page,
    limit,
    totalPages
  }
}

/**
 * 延迟执行
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 生成随机字符串
 */
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
