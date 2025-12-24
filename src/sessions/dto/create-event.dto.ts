import { IsString, IsOptional } from 'class-validator';
/* eslint-disable @typescript-eslint/no-unsafe-call */

export class CreateSessionDto {
  @IsString()
  sessionId: string;

  @IsString()
  language: string;

  @IsOptional()
  metadata?: Record<string, any>;
}
