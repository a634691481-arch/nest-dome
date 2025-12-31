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
import { ApiOperation, ApiTags, ApiResponse, ApiConsumes, ApiParam } from '@nestjs/swagger'

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '上传图片到阿里云 OSS' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: '图片上传成功' })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('请选择要上传的图片')
    }
    return await this.uploadService.saveImage(file)
  }

  @Get('list')
  @ApiOperation({ summary: '获取上传记录列表' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getUploadList() {
    return await this.uploadService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: '根据 ID 获取上传记录' })
  @ApiParam({ name: 'id', description: '上传记录 ID' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getUploadById(@Param('id', ParseIntPipe) id: number) {
    return await this.uploadService.findOne(id)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除上传的图片' })
  @ApiParam({ name: 'id', description: '上传记录 ID' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async deleteImage(@Param('id', ParseIntPipe) id: number) {
    await this.uploadService.deleteImage(id)
    return { message: '删除成功' }
  }
}
