import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';

@Injectable()
export class BarbersService {
  constructor(private prisma: PrismaService) {}

  create(createBarberDto: CreateBarberDto) {
    return this.prisma.barber.create({ data: createBarberDto });
  }

  findAll() {
    return this.prisma.barber.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const barber = await this.prisma.barber.findUnique({ where: { id } });
    if (!barber) {
      throw new NotFoundException('Barber tidak ditemukan');
    }

    return barber;
  }

  async update(id: number, updateBarberDto: UpdateBarberDto) {
    await this.findOne(id);
    return this.prisma.barber.update({
      where: { id },
      data: updateBarberDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.barber.delete({ where: { id } });
  }
}
