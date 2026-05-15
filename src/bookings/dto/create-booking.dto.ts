import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: '2026-05-20T10:00:00.000Z' })
  @Type(() => Date)
  @IsDate({ message: 'Tanggal booking harus berupa format tanggal yang valid' })
  bookingDate: Date;

  @ApiProperty({ example: 1 })
  @IsInt({ message: 'Service id harus berupa angka bulat' })
  @IsPositive({ message: 'Service id harus lebih dari 0' })
  serviceId: number;

  @ApiProperty({ example: 1 })
  @IsInt({ message: 'Barber id harus berupa angka bulat' })
  @IsPositive({ message: 'Barber id harus lebih dari 0' })
  barberId: number;

  @ApiPropertyOptional({ example: 'Tolong potong rapi untuk acara kerja' })
  @IsOptional()
  @IsString({ message: 'Catatan customer harus berupa teks' })
  customerNote?: string;
}
