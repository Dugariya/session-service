import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversationSession, SessionDocument } from './schemas/session.schema';
import { ConversationEvent, EventDocument } from './schemas/event.schema';

export class SessionsRepository {
  constructor(
    @InjectModel(ConversationSession.name)
    private sessionModel: Model<SessionDocument>,

    @InjectModel(ConversationEvent.name)
    private eventModel: Model<EventDocument>,
  ) {}

  upsertSession(data: Partial<ConversationSession>) {
    return this.sessionModel.findOneAndUpdate(
      { sessionId: data.sessionId },
      { $setOnInsert: data },
      { upsert: true, new: true },
    );
  }

  findSession(sessionId: string) {
    return this.sessionModel.findOne({ sessionId });
  }

  createEvent(event: ConversationEvent) {
    return this.eventModel.create(event);
  }

  findEvents(sessionId: string, limit: number, offset: number) {
    return this.eventModel
      .find({ sessionId })
      .sort({ timestamp: 1 })
      .skip(offset)
      .limit(limit);
  }

  completeSession(sessionId: string) {
    return this.sessionModel.updateOne(
      { sessionId, status: { $ne: 'completed' } },
      { $set: { status: 'completed', endedAt: new Date() } },
    );
  }
}
