import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDjDto } from './dto/create-event-dj.dto';
import { UpdateEventDjDto } from './dto/update-event-dj.dto';

@Injectable()
export class EventDjService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateEventDjDto) {
    return this.prisma.eventDJ.create({ data: dto });
  }

  findAll() {
    return this.prisma.eventDJ.findMany();
  }

  findOne(id: number) {
    return this.prisma.eventDJ.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateEventDjDto) {
    return this.prisma.eventDJ.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.eventDJ.delete({ where: { id } });
  }
}
