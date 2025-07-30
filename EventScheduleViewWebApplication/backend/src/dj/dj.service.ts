import { Injectable } from '@nestjs/common';
import { CreateDjDto } from './dto/create-dj.dto';
import { UpdateDjDto } from './dto/update-dj.dto';

@Injectable()
export class DjService {
  create(createDjDto: CreateDjDto) {
    return 'This action adds a new dj';
  }

  findAll() {
    return `This action returns all dj`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dj`;
  }

  update(id: number, updateDjDto: UpdateDjDto) {
    return `This action updates a #${id} dj`;
  }

  remove(id: number) {
    return `This action removes a #${id} dj`;
  }
}
