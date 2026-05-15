import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register customer baru' })
  @ApiOkResponse({ description: 'Register berhasil dan mengembalikan accessToken' })
  @ApiBadRequestResponse({ description: 'Email sudah digunakan atau data tidak valid' })
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Login user customer/admin' })
  @ApiOkResponse({ description: 'Login berhasil dan mengembalikan accessToken' })
  @ApiUnauthorizedResponse({ description: 'Email atau password salah' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
