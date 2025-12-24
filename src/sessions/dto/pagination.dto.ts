import { IsOptional, IsNumberString } from 'class-validator';
/* eslint-disable @typescript-eslint/no-unsafe-call */

export class PaginationDto {
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsNumberString()
  offset?: string;
}
