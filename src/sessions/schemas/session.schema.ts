import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SessionDocument = ConversationSession & Document;

@Schema({ timestamps: true })
export class ConversationSession {
  @Prop({ required: true, unique: true })
  sessionId: string;

  @Prop({ required: true })
  status: 'initiated' | 'active' | 'completed' | 'failed';

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  startedAt: Date;

  @Prop()
  endedAt?: Date;

  @Prop({ type: Object })
  metadata?: Record<string, any>;
}
export const SessionSchema = SchemaFactory.createForClass(ConversationSession);
