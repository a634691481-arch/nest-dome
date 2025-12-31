import { PartialType } from '@nestjs/swagger';
import { CreateIndexDto } from './create-index.dto';

export class UpdateIndexDto extends PartialType(CreateIndexDto) {}
