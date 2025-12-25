/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsIn } from 'class-validator';

export class CreateEventDto {
  @IsString()
  eventId: string;

  @IsIn(['user_speech', 'bot_speech', 'system'])
  type: string;

  payload: Record<string, any>;

  timestamp: Date;
}
