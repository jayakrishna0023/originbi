// backend/admin-service/src/registrations/dto/create-registration.dto.ts
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateRegistrationDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  gender: string; // 'Male' | 'Female' | 'Other'

  @IsString()
  countryCode: string; // e.g. '+91'

  @IsString()
  mobile: string;

  // Program ID from programs table (stringified)
  @IsString()
  programType: string;

  @IsOptional()
  @IsString()
  groupName?: string;

  @IsBoolean()
  sendEmail: boolean;

  // These come as string (ISO or date-only) from frontend
  @IsOptional()
  @IsString()
  examStart?: string;

  @IsOptional()
  @IsString()
  examEnd?: string;

  // SCHOOL-specific
  @IsOptional()
  @IsString()
  schoolLevel?: string; // 'SSLC' | 'HSC'

  @IsOptional()
  @IsString()
  schoolStream?: string; // 'Science' | 'Commerce' | 'Humanities'

  // For HSC year (12) or college batch (2025)
  @IsOptional()
  @IsString()
  currentYear?: string;

  // COLLEGE-specific (Department Degree ID)
  @IsOptional()
  @IsString()
  departmentId?: string;
}
