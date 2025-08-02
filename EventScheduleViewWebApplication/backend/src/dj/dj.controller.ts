import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DjService } from './dj.service';
import { CreateDjDto } from './dto/create-dj.dto';

@Controller('dj')
export class DjController {
  constructor(private readonly djService: DjService) {}

  @Get()
  findAll() {
    return this.djService.findAll();
  }

  @Post()
  create(@Body() createDjDto: CreateDjDto) {
    return this.djService.create(createDjDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.djService.findOne(+id);
  }
}
