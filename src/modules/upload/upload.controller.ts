import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  ParseIntPipe
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadService } from './upload.service'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file')) // "file" 对应前端表单字段名
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('请选择要上传的图片')
    }
    return await this.uploadService.saveImage(file)
  }

  @Get('list')
  async getUploadList() {
    return await this.uploadService.findAll()
  }

  @Get(':id')
  async getUploadById(@Param('id', ParseIntPipe) id: number) {
    return await this.uploadService.findOne(id)
  }

  @Delete(':id')
  async deleteImage(@Param('id', ParseIntPipe) id: number) {
    await this.uploadService.deleteImage(id)
    return { message: '删除成功' }
  }
}
