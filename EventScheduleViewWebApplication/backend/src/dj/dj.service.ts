import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDjDto } from './dto/create-dj.dto';

@Injectable()
export class DjService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.dJ.findMany();
  }

  create(createDjDto: CreateDjDto) {
    return this.prisma.dJ.create({ data: createDjDto });
  }

  findOne(id: number) {
    return this.prisma.dJ.findUnique({ where: { id } });
  }
}
