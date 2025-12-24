import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = ConversationEvent & Document;

@Schema({ timestamps: true })
export class ConversationEvent {
  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true })
  type: 'user_speech' | 'bot_speech' | 'system';

  @Prop({ required: true, type: Object })
  payload: Record<string, any>;

  @Prop({ required: true })
  timestamp: Date;
}

export const EventSchema = SchemaFactory.createForClass(ConversationEvent);

// compound unique index
EventSchema.index({ sessionId: 1, eventId: 1 }, { unique: true });
EventSchema.index({ sessionId: 1, timestamp: 1 });
