import { Injectable, NotFoundException } from '@nestjs/common';
import { SessionsRepository } from './sessions.repository';
import { CreateSessionDto } from './dto/create-session.dto';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class SessionsService {
  constructor(private readonly repo: SessionsRepository) {}

  createOrGetSession(dto: CreateSessionDto) {
    return this.repo.upsertSession({
      sessionId: dto.sessionId,
      language: dto.language,
      status: 'initiated',
      startedAt: new Date(),
      metadata: dto.metadata,
    });
  }

  async addEvent(sessionId: string, dto: CreateEventDto) {
    const session = await this.repo.findSession(sessionId);
    if (!session) throw new NotFoundException('Session not found');

    try {
      return await this.repo.createEvent({
        sessionId,
        ...dto,
      } as any);
    } catch (err) {
      if ((err as { code?: number }).code === 11000)
        return { message: 'Duplicate event ignored' };
      throw err;
    }
  }

  async getSession(sessionId: string, limit = 20, offset = 0) {
    const session = await this.repo.findSession(sessionId);
    if (!session) throw new NotFoundException('Session not found');

    const events = await this.repo.findEvents(sessionId, limit, offset);
    return { session, events };
  }

  completeSession(sessionId: string) {
    return this.repo.completeSession(sessionId);
  }
}
