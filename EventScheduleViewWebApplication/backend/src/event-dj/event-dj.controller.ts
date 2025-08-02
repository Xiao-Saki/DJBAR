import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventDjService } from './event-dj.service';
import { CreateEventDjDto } from './dto/create-event-dj.dto';
import { UpdateEventDjDto } from './dto/update-event-dj.dto';

@Controller('event-dj')
export class EventDjController {
  constructor(private readonly service: EventDjService) {}

  @Post()
  create(@Body() dto: CreateEventDjDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEventDjDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
