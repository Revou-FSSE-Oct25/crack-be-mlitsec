import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Haircut' })
  @IsString({ message: 'Nama service harus berupa teks' })
  @IsNotEmpty({ message: 'Nama service wajib diisi' })
  name: string;

  @ApiPropertyOptional({ example: 'Potong rambut pria' })
  @IsOptional()
  @IsString({ message: 'Deskripsi harus berupa teks' })
  description?: string;

  @ApiProperty({ example: 50000 })
  @IsInt({ message: 'Harga harus berupa angka bulat' })
  @IsPositive({ message: 'Harga harus lebih dari 0' })
  price: number;

  @ApiProperty({ example: 45, description: 'Durasi dalam menit' })
  @IsInt({ message: 'Durasi harus berupa angka bulat' })
  @IsPositive({ message: 'Durasi harus lebih dari 0' })
  duration: number;
}
