import { Injectable, BadRequestException } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class UploadService {
  private readonly uploadDir = './uploads'

  constructor() {
    // 确保上传目录存在
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true })
    }
  }

  saveImage(file: Express.Multer.File): {
    url: string
    filename: string
    size: number
    mimeType: string
  } {
    // 验证文件类型
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('不支持的图片格式，仅支持 jpg、png、gif、webp 格式')
    }

    // 验证文件大小（限制5MB）
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      throw new BadRequestException('图片大小不能超过 5MB')
    }

    // 生成唯一文件名
    const fileExtension = path.extname(file.originalname)
    const fileName = `${uuidv4()}${fileExtension}`
    const filePath = path.join(this.uploadDir, fileName)

    // 保存文件
    fs.writeFileSync(filePath, file.buffer)

    return {
      url: `/uploads/${fileName}`,
      filename: fileName,
      size: file.size,
      mimeType: file.mimetype
    }
  }
}
