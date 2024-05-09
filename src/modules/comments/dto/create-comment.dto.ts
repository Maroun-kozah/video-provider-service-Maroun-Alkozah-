import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateCommentDto {
  @IsMongoId()
  @IsNotEmpty()
  id: Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  text: string;
}
