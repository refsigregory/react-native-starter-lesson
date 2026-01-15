import { IsNotEmpty, IsDateString, IsString, IsOptional, IsEnum } from 'class-validator';
import { SickLeaveStatus } from '../types';

export class CreateSickLeaveDto {
  @IsNotEmpty()
  @IsDateString()
  startDate!: string;

  @IsNotEmpty()
  @IsDateString()
  endDate!: string;

  @IsNotEmpty()
  @IsString()
  reason!: string;

  @IsOptional()
  @IsString()
  medicalCertificate?: string;
}

export class UpdateSickLeaveDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  medicalCertificate?: string;
}

export class ReviewSickLeaveDto {
  @IsNotEmpty()
  @IsEnum(SickLeaveStatus)
  status!: SickLeaveStatus;

  @IsOptional()
  @IsString()
  adminComment?: string;
}
