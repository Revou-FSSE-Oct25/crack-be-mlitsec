import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateBookingStatusDto {
  @ApiProperty({
    enum: BookingStatus,
    example: BookingStatus.confirmed,
  })
  @IsEnum(BookingStatus, {
    message: 'Status harus salah satu dari: pending, confirmed, cancelled, completed',
  })
  status: BookingStatus;
}
