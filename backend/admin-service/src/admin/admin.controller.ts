import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AdminLoginGuard } from '../adminlogin/adminlogin.guard';

interface AdminRequest extends Request {
  user?: any;
}

@Controller('admin')
@UseGuards(AdminLoginGuard) // 👈 all routes require ADMIN login
export class AdminController {
  @Get('me')
  getMe(@Req() req: AdminRequest) {
    return {
      message: 'Admin authenticated successfully',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user: req.user, // set in AdminLoginGuard
    };
  }

  @Get('dashboard')
  getDashboard(@Req() req: AdminRequest) {
    return {
      message: 'Admin dashboard data',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      adminName: req.user?.fullName,
    };
  }
}
