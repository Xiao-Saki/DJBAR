import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDjDto } from './create-event-dj.dto';

export class UpdateEventDjDto extends PartialType(CreateEventDjDto) {}
