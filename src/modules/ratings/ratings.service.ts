// src/modules/ratings/ratings.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating } from './ratings.schema';
import { AddRatingDto } from './dto/add-rating.dto';
import { REQUEST } from '@nestjs/core';
import { UserRequest } from '../../common/types';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Rating.name) private ratingModel: Model<Rating>,
    @Inject(REQUEST) private readonly request: UserRequest, // Ensure REQUEST is properly configured to be injectable
  ) {}

  async addRating(body: AddRatingDto, videoId: string) {
    const userId = this.request.user?._id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    const exist = await this.ratingModel.findOne({ userId, videoId });
    if (exist) {
      return this.ratingModel.findOneAndUpdate(
        { userId, videoId },
        { $set: { rating: body.rating } },
        { new: true },
      );
    }
    const rating = new this.ratingModel({
      rating: body.rating,
      videoId: videoId,
      userId: userId,
    });
    return rating.save();
  }
}
