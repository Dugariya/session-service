import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly service: SessionsService) {}

  @Post()
  createSession(@Body() dto: CreateSessionDto) {
    return this.service.createOrGetSession(dto);
  }

  @Post(':sessionId/events')
  addEvent(@Param('sessionId') sessionId: string, @Body() dto: CreateEventDto) {
    return this.service.addEvent(sessionId, dto);
  }

  @Get(':sessionId')
  getSession(
    @Param('sessionId') sessionId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.service.getSession(
      sessionId,
      Number(pagination.limit || 20),
      Number(pagination.offset || 0),
    );
  }

  @Post(':sessionId/complete')
  complete(@Param('sessionId') sessionId: string) {
    return this.service.completeSession(sessionId);
  }
}
