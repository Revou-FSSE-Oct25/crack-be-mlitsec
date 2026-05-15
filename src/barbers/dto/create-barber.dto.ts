import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBarberDto {
  @ApiProperty({ example: 'Budi' })
  @IsString({ message: 'Nama barber harus berupa teks' })
  @IsNotEmpty({ message: 'Nama barber wajib diisi' })
  name: string;

  @ApiPropertyOptional({ example: '081234567001' })
  @IsOptional()
  @IsString({ message: 'Nomor telepon harus berupa teks' })
  phone?: string;
}
