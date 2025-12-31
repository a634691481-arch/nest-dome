import { Injectable, BadRequestException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import OSS from 'ali-oss'
import * as path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { Upload } from './entities/upload.entity'
import { IndexService } from '../index/index.service' // 导入 IndexService

@Injectable()
export class UploadService {
  private ossClient: OSS

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
    private readonly indexService: IndexService // 注入 IndexService
  ) {
    // 初始化 OSS 客户端
    this.ossClient = new OSS({
      region: this.configService.get<string>('oss.region')!,
      accessKeyId: this.configService.get<string>('oss.accessKeyId')!,
      accessKeySecret: this.configService.get<string>('oss.accessKeySecret')!,
      bucket: this.configService.get<string>('oss.bucket')!
    })
  }

  /**
   * 上传图片到阿里云 OSS
   * @param file 上传的文件
   * @returns 上传结果（包含 URL、文件名等信息）
   */
  async saveImage(file: Express.Multer.File): Promise<{
    id: number
    url: string
    filename: string
    size: number
    mimeType: string
  }> {
    // 验证文件类型
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('不支持的图片格式，仅支持 jpg、png、gif、webp 格式')
    }

    // 验证文件大小（限制5MB）
    // const maxSize = 5 * 1024 * 1024
    // if (file.size > maxSize) {
    //   throw new BadRequestException('图片大小不能超过 5MB')
    // }

    try {
      // 生成唯一文件名
      const fileExtension = path.extname(file.originalname)
      const fileName = `${uuidv4()}${fileExtension}`
      // 按日期分目录存储：uploads/2025/12/31/xxx.jpg
      const date = new Date()
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const ossPath = `uploads/${year}/${month}/${day}/${fileName}`

      // 上传到 OSS
      const result = await this.ossClient.put(ossPath, file.buffer)

      // 获取文件访问 URL
      let fileUrl = result.url
      // 如果配置了自定义域名，使用自定义域名
      const customDomain = this.configService.get('oss.customDomain')
      if (customDomain) {
        fileUrl = `${customDomain}/${ossPath}`
      }

      // 保存上传记录到数据库
      const uploadRecord = this.uploadRepository.create({
        filename: fileName,
        originalName: file.originalname,
        mimeType: file.mimetype,
        url: fileUrl,
        size: file.size
      })

      const savedRecord = await this.uploadRepository.save(uploadRecord)
      // 我想在这儿调用  IndexService 里面的  create接口
      await this.indexService.create({ title: fileName, content: fileUrl })

      return {
        id: savedRecord.id,
        url: fileUrl,
        filename: fileName,
        size: file.size,
        mimeType: file.mimetype
      }
    } catch (error) {
      throw new BadRequestException(`图片上传失败: ${error.message}`)
    }
  }

  /**
   * 删除 OSS 上的文件
   * @param id 上传记录的 ID
   */
  async deleteImage(id: number): Promise<void> {
    const uploadRecord = await this.uploadRepository.findOne({ where: { id } })

    if (!uploadRecord) {
      throw new BadRequestException('文件记录不存在')
    }

    try {
      // 从 URL 中提取 OSS 文件路径
      const customDomain = this.configService.get('oss.customDomain')
      const bucket = this.configService.get('oss.bucket')
      const region = this.configService.get('oss.region')

      let ossPath: string
      if (customDomain && uploadRecord.url.startsWith(customDomain)) {
        // 使用自定义域名的情况
        ossPath = uploadRecord.url.replace(`${customDomain}/`, '')
      } else {
        // 使用默认域名的情况
        const defaultDomain = `https://${bucket}.${region}.aliyuncs.com/`
        ossPath = uploadRecord.url.replace(defaultDomain, '')
      }

      // 删除 OSS 文件
      await this.ossClient.delete(ossPath)

      // 删除数据库记录
      await this.uploadRepository.remove(uploadRecord)
    } catch (error) {
      throw new BadRequestException(`文件删除失败: ${error.message}`)
    }
  }

  /**
   * 获取上传记录列表
   */
  async findAll(): Promise<Upload[]> {
    return await this.uploadRepository.find({
      order: { createdAt: 'DESC' }
    })
  }

  /**
   * 根据 ID 获取上传记录
   */
  async findOne(id: number): Promise<Upload> {
    const uploadRecord = await this.uploadRepository.findOne({ where: { id } })

    if (!uploadRecord) {
      throw new BadRequestException('文件记录不存在')
    }

    return uploadRecord
  }
}
