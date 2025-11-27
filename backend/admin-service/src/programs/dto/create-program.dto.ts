import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  assessment_title?: string;

  @IsOptional()
  @IsString()
  report_title?: string;

  @IsOptional()
  @IsBoolean()
  is_demo?: boolean;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
