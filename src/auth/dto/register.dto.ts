import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Customer Satu' })
  @IsString({ message: 'Nama harus berupa teks' })
  @IsNotEmpty({ message: 'Nama wajib diisi' })
  name: string;

  @ApiProperty({ example: 'customer@mail.com' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString({ message: 'Password harus berupa teks' })
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password: string;
}
