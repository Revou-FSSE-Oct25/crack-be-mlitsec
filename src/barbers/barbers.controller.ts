import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { BarbersService } from './barbers.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';

@ApiTags('Barbers')
@Controller('barbers')
export class BarbersController {
  constructor(private barbersService: BarbersService) {}

  @ApiOperation({ summary: 'Melihat semua barber' })
  @ApiOkResponse({ description: 'List barber berhasil diambil' })
  @Get()
  findAll() {
    return this.barbersService.findAll();
  }

  @ApiOperation({ summary: 'Melihat detail barber berdasarkan id' })
  @ApiNotFoundResponse({ description: 'Barber tidak ditemukan' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.barbersService.findOne(id);
  }

  @ApiOperation({ summary: 'Membuat barber baru (admin)' })
  @ApiUnauthorizedResponse({ description: 'Token belum dikirim atau tidak valid' })
  @ApiForbiddenResponse({ description: 'Hanya admin yang boleh akses' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.admin)
  @Post()
  create(@Body() createBarberDto: CreateBarberDto) {
    return this.barbersService.create(createBarberDto);
  }

  @ApiOperation({ summary: 'Mengubah data barber (admin)' })
  @ApiNotFoundResponse({ description: 'Barber tidak ditemukan' })
  @ApiUnauthorizedResponse({ description: 'Token belum dikirim atau tidak valid' })
  @ApiForbiddenResponse({ description: 'Hanya admin yang boleh akses' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.admin)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBarberDto: UpdateBarberDto,
  ) {
    return this.barbersService.update(id, updateBarberDto);
  }

  @ApiOperation({ summary: 'Menghapus barber (admin)' })
  @ApiNotFoundResponse({ description: 'Barber tidak ditemukan' })
  @ApiUnauthorizedResponse({ description: 'Token belum dikirim atau tidak valid' })
  @ApiForbiddenResponse({ description: 'Hanya admin yang boleh akses' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.barbersService.remove(id);
  }
}
