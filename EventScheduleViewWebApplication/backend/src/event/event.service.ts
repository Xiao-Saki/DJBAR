import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.event.findMany({
      include: {
        bar: true,
        registeredBy: true,
        djs: {
          include: { dj: true },
        },
      },
    });
  }

  create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({ data: createEventDto });
  }

  findOne(id: number) {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        bar: true,
        registeredBy: true,
        djs: {
          include: { dj: true },
        },
      },
    });
  }
}
