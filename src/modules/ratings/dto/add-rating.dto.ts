import { IsInt, IsMongoId, IsNotEmpty, Max, Min } from 'class-validator';
import * as mongoose from 'mongoose';

export class AddRatingDto {
  
  @IsMongoId()
  @IsNotEmpty()
  userId: mongoose.Schema.Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  videoId: mongoose.Schema.Types.ObjectId;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
