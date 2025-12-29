import { PartialType } from '@nestjs/mapped-types';
import { CreateCoreDto } from './create-core.dto';

export class UpdateCoreDto extends PartialType(CreateCoreDto) {}
