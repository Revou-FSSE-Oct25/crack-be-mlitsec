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
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @ApiOperation({ summary: 'Melihat semua service barbershop' })
  @ApiOkResponse({ description: 'List service berhasil diambil' })
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @ApiOperation({ summary: 'Melihat detail service berdasarkan id' })
  @ApiNotFoundResponse({ description: 'Service tidak ditemukan' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.findOne(id);
  }

  @ApiOperation({ summary: 'Membuat service baru (admin)' })
  @ApiUnauthorizedResponse({ description: 'Token belum dikirim atau tidak valid' })
  @ApiForbiddenResponse({ description: 'Hanya admin yang boleh akses' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.admin)
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @ApiOperation({ summary: 'Mengubah service (admin)' })
  @ApiNotFoundResponse({ description: 'Service tidak ditemukan' })
  @ApiUnauthorizedResponse({ description: 'Token belum dikirim atau tidak valid' })
  @ApiForbiddenResponse({ description: 'Hanya admin yang boleh akses' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.admin)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @ApiOperation({ summary: 'Menghapus service (admin)' })
  @ApiNotFoundResponse({ description: 'Service tidak ditemukan' })
  @ApiUnauthorizedResponse({ description: 'Token belum dikirim atau tidak valid' })
  @ApiForbiddenResponse({ description: 'Hanya admin yang boleh akses' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.remove(id);
  }
}
