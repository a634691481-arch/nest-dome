import { IsString, IsBoolean, IsOptional } from 'class-validator'

export class CreateIndexDto {
  @IsString()
  title: string

  @IsString()
  content: string

  @IsBoolean()
  @IsOptional()
  isActive?: boolean
}
