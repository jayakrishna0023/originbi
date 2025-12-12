import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AdminUser } from '../../../database/entities/AdminUser';
import { AdminModule } from './admin/admin.module';
import { ProgramsModule } from './programs/programs.module';
import { AdminLoginModule } from './adminlogin/adminlogin.module';
import { DepartmentsModule } from './departments/departments.module';
import { RegistrationsModule } from './registrations/registrations.module';

const isProd = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: isProd ? '.env.production' : '.env.local',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,

      // SSL only in production (Neon)
      ssl: isProd ? { rejectUnauthorized: false } : false,
    }),

    AdminLoginModule,
    AdminModule,
    ProgramsModule,
    DepartmentsModule,
    RegistrationsModule,
  ],
})
export class AppModule {}
