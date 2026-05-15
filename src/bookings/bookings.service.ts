import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createBookingDto: CreateBookingDto) {
    await this.ensureServiceExists(createBookingDto.serviceId);
    await this.ensureBarberExists(createBookingDto.barberId);

    return this.prisma.booking.create({
      data: {
        bookingDate: createBookingDto.bookingDate,
        customerNote: createBookingDto.customerNote,
        userId,
        serviceId: createBookingDto.serviceId,
        barberId: createBookingDto.barberId,
      },
      include: this.bookingRelations(),
    });
  }

  findMine(userId: number) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: this.bookingRelations(),
      orderBy: { bookingDate: 'desc' },
    });
  }

  findAll() {
    return this.prisma.booking.findMany({
      include: this.bookingRelations(),
      orderBy: { bookingDate: 'desc' },
    });
  }

  async updateStatus(id: number, updateBookingStatusDto: UpdateBookingStatusDto) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      throw new NotFoundException('Booking tidak ditemukan');
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status: updateBookingStatusDto.status },
      include: this.bookingRelations(),
    });
  }

  private async ensureServiceExists(serviceId: number) {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new NotFoundException('Service tidak ditemukan');
    }
  }

  private async ensureBarberExists(barberId: number) {
    const barber = await this.prisma.barber.findUnique({
      where: { id: barberId },
    });

    if (!barber) {
      throw new NotFoundException('Barber tidak ditemukan');
    }
  }

  private bookingRelations() {
    return {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      service: true,
      barber: true,
    };
  }
}
