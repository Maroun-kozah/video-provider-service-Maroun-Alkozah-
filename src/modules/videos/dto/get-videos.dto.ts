import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class GetVideosDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsBooleanString()
  @IsOptional()
  sortByRating?: boolean;
}
