import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
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
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

type RequestWithUser = {
  user: {
    id: number;
    email: string;
    role: Role;
  };
};

@ApiTags('Bookings')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @ApiOperation({ summary: 'Membuat booking baru (customer login)' })
  @ApiNotFoundResponse({ description: 'Service atau barber tidak ditemukan' })
  @ApiUnauthorizedResponse({ description: 'Token belum dikirim atau tidak valid' })
  @Post()
  create(@Req() req: RequestWithUser, @Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(req.user.id, createBookingDto);
  }

  @ApiOperation({ summary: 'Melihat booking milik user yang sedang login' })
  @ApiOkResponse({ description: 'List booking milik customer berhasil diambil' })
  @ApiUnauthorizedResponse({ description: 'Token belum dikirim atau tidak valid' })
  @Get('my-bookings')
  findMine(@Req() req: RequestWithUser) {
    return this.bookingsService.findMine(req.user.id);
  }

  @ApiOperation({ summary: 'Melihat semua booking (admin)' })
  @ApiUnauthorizedResponse({ description: 'Token belum dikirim atau tidak valid' })
  @ApiForbiddenResponse({ description: 'Hanya admin yang boleh akses' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.admin)
  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @ApiOperation({ summary: 'Mengubah status booking (admin)' })
  @ApiNotFoundResponse({ description: 'Booking tidak ditemukan' })
  @ApiUnauthorizedResponse({ description: 'Token belum dikirim atau tidak valid' })
  @ApiForbiddenResponse({ description: 'Hanya admin yang boleh akses' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.admin)
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingStatusDto: UpdateBookingStatusDto,
  ) {
    return this.bookingsService.updateStatus(id, updateBookingStatusDto);
  }
}
