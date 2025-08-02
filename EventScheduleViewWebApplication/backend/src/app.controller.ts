import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getUsers() {
    // DBからUser一覧取得
    const users = await prisma.user.findMany();
    return users;
  }

  @Get('bars')
  async getBars() {
    // DBからbar一覧を取得
    const bars = await prisma.bar.findMany();
    return bars;
  }
}
