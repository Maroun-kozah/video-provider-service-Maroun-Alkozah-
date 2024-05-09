import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RatingDocument = mongoose.HydratedDocument<Rating>;

@Schema({ timestamps: true })
export class Rating {
  @Prop()
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  videoId: mongoose.Schema.Types.ObjectId;

  @Prop()
  rating: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
RatingSchema.index({ userId: 1, videoId: 1 }, { unique: true });
