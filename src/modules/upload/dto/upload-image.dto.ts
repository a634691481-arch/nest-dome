import { ApiProperty } from '@nestjs/swagger'

export class UploadImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: '要上传的图片文件（支持 jpg、png、gif、webp 格式，最大 5MB）'
  })
  file: any
}
