import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { AddRatingDto } from './dto/add-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post('/add/:id')
  addRating(@Body() body: AddRatingDto, @Param('id') videoId: string) {
    return this.ratingsService.addRating(body, videoId);
  }
}
