import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBarDto } from './dto/create-bar.dto';

@Injectable()
export class BarService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.bar.findMany();
  }

  create(createBarDto: CreateBarDto) {
    return this.prisma.bar.create({ data: createBarDto });
  }

  findOne(id: number) {
    return this.prisma.bar.findUnique({ where: { id } });
  }
}
