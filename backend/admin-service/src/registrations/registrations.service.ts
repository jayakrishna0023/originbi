// backend/admin-service/src/registrations/registrations.service.ts

import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { User } from '../users/user.entity';
import { Registration } from './registration.entity';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Injectable()
export class RegistrationsService {
  /**
   * Base URL of auth-service.
   * Example: AUTH_SERVICE_URL=http://localhost:4002
   */
  private authServiceBaseUrl =
    process.env.AUTH_SERVICE_URL || 'http://localhost:4002';

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>, // (kept even if not used directly)

    @InjectRepository(Registration)
    private readonly regRepo: Repository<Registration>,

    private readonly dataSource: DataSource,
    private readonly http: HttpService,
  ) {}

  // ---------------------------------------------------------
  // 🔹 Helper: Call auth-service to create a Cognito user
  // ---------------------------------------------------------
  private async createCognitoUser(email: string, password: string) {
    console.log('[RegistrationsService] createCognitoUser email =', email);
    console.log(
      '[RegistrationsService] createCognitoUser password =',
      '***hidden***',
    );

    if (!email) {
      throw new BadRequestException('Email is required for Cognito user');
    }

    if (!password) {
      throw new BadRequestException('Password is required for Cognito user');
    }

    try {
      const res$ = this.http.post(
        `${this.authServiceBaseUrl}/internal/cognito/users`,
        { email, password },
      );

      const res = await firstValueFrom(res$);

      console.log(
        '[RegistrationsService] auth-service /internal/cognito/users response =',
        res.data,
      );

      return res.data as { sub?: string };
    } catch (err: any) {
      const authErr = err?.response?.data || err?.message || err;

      console.error(
        '[RegistrationsService] Error calling auth-service /internal/cognito/users:',
        authErr,
      );

      // return actual message from auth-service if present (helps debugging)
      throw new InternalServerErrorException(
        authErr?.message || 'Failed to create Cognito user via auth-service',
      );
    }
  }

  // ---------------------------------------------------------
  // 🔹 CREATE REGISTRATION (called by frontend)
  // ---------------------------------------------------------
  async create(dto: CreateRegistrationDto, createdByUserId?: number | null) {
    console.log('[RegistrationsService] create dto =', {
      ...dto,
      password: dto.password ? '***hidden***' : undefined, // do not log password
    });

    // 1) Create Cognito user via auth-service
    const { sub } = await this.createCognitoUser(dto.email, dto.password);

    if (!sub) {
      throw new InternalServerErrorException(
        'Cognito sub not returned from auth-service',
      );
    }

    // 2) Wrap DB operations in a transaction
    return this.dataSource.transaction(async (manager) => {
      // --- Create User row ---
      const user = manager.create(User, {
        email: dto.email,
        fullName: dto.name,
        mobileCountryCode: dto.countryCode,
        role: 'STUDENT',
        emailVerified: true,
        cognitoSub: sub,
        isActive: true,
        isBlocked: false,
      });
      await manager.save(user);

      // Decide registrationSource based on whether we have createdByUserId
      // DB enum allowed: 'SELF' | 'ADMIN' | 'CORPORATE' | 'RESELLER'
      const registrationSource =
        createdByUserId && createdByUserId > 0 ? 'ADMIN' : 'SELF';

      // For status, DB enum allowed: 'INCOMPLETE' | 'COMPLETED' | 'CANCELLED'
      const status: 'INCOMPLETE' | 'COMPLETED' | 'CANCELLED' = 'INCOMPLETE';

      // --- Create Registration row ---
      const registration = manager.create(Registration, {
        userId: user.id,
        registrationSource,
        createdByUserId: createdByUserId ?? null,
        status,
        // Store additional fields in metadata
        metadata: {
          gender: dto.gender,
          programType: dto.programType,
          groupName: dto.groupName,
          sendEmail: dto.sendEmail,
          schoolLevel: dto.schoolLevel,
          schoolStream: dto.schoolStream,
          currentYear: dto.currentYear,
          departmentId: dto.departmentId,
          mobile: dto.mobile,
          examStart: dto.examStart ?? null,
          examEnd: dto.examEnd ?? null,
        },
      });
      await manager.save(registration);

      return {
        registrationId: registration.id,
        userId: user.id,
        email: user.email,
      };
    });
  }

  // ---------------------------------------------------------
  // 🔹 LIST REGISTRATIONS FOR FRONTEND TABLE
  // ---------------------------------------------------------
  async findAll(page: number, limit: number, tab?: string, search?: string) {
    const qb = this.regRepo
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.user', 'u')
      .where('r.isDeleted = false');

    if (search) {
      const s = `%${search.toLowerCase()}%`;
      qb.andWhere('(LOWER(u.fullName) LIKE :s OR LOWER(u.email) LIKE :s)', {
        s,
      });
    }

    const total = await qb.getCount();

    const rows = await qb
      .orderBy('r.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const data = rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      name: r.user?.fullName ?? null,
      email: r.user?.email ?? null,
      mobile: r.metadata?.mobile ?? null,
      programType: r.metadata?.programType ?? null,
      status: r.status,
      examStart: r.metadata?.examStart ?? null,
      examEnd: r.metadata?.examEnd ?? null,
      createdAt: r.createdAt,
    }));

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
