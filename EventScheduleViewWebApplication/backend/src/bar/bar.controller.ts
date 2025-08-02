import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BarService } from './bar.service';
import { CreateBarDto } from './dto/create-bar.dto';

@Controller('bar')
export class BarController {
  constructor(private readonly barService: BarService) {}

  @Get()
  findAll() {
    return this.barService.findAll();
  }

  @Post()
  create(@Body() createBarDto: CreateBarDto) {
    return this.barService.create(createBarDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barService.findOne(+id);
  }
}
