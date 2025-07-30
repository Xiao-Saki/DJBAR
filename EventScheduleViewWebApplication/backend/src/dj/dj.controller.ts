import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DjService } from './dj.service';
import { CreateDjDto } from './dto/create-dj.dto';
import { UpdateDjDto } from './dto/update-dj.dto';

@Controller('dj')
export class DjController {
  constructor(private readonly djService: DjService) {}

  @Post()
  create(@Body() createDjDto: CreateDjDto) {
    return this.djService.create(createDjDto);
  }

  @Get()
  findAll() {
    return this.djService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.djService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDjDto: UpdateDjDto) {
    return this.djService.update(+id, updateDjDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.djService.remove(+id);
  }
}
