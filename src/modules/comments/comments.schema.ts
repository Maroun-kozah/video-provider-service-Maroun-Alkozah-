import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CommentDocument = mongoose.HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop()
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  videoId: mongoose.Schema.Types.ObjectId;

  @Prop({ default: null })
  parentCommentId: mongoose.Schema.Types.ObjectId;

  @Prop()
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.index({ videoId: 1, createdAt: -1, parentCommentId: 1 });
