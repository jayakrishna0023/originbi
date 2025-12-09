import { Body, Controller, Post, Req, Get, Query } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  async create(@Body() dto: CreateRegistrationDto, @Req() req: any) {
    const adminId = null; // later: req.user.id
    return this.registrationsService.create(dto, adminId);
  }

  // 🔹 NEW: list registrations for the table
  @Get()
  async list(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('tab') tab?: string,
    @Query('search') search?: string,
  ) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    return this.registrationsService.findAll(pageNum, limitNum, tab, search);
  }
}
