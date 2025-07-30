import { PartialType } from '@nestjs/mapped-types';
import { CreateDjDto } from './create-dj.dto';

export class UpdateDjDto extends PartialType(CreateDjDto) {}
