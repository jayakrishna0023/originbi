// backend/admin-service/src/registrations/dto/create-registration.dto.ts
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNotEmpty, MinLength, Matches
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

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  @Matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;

}
