import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './videos.schema';
import { GetVideosDto } from './dto/get-videos.dto';
import { REQUEST } from '@nestjs/core';
import { UserRequest } from '../../common/types';

@Injectable()
export class VideosService {
  [x: string]: any;
  constructor(
    @InjectModel(Video.name) private videoModel: Model<Video>,
    @Inject(REQUEST) private readonly request: UserRequest, // Make sure to configure RequestContext correctly if using this approach
  ) { }


  async getVideos(query: GetVideosDto): Promise<Video[]> {
    const agg = [];

    if (query.title) {
      agg.push({ $match: { title: { $regex: query.title, $options: "i" } } });
    }

    if (query.sortByRating) {
      agg.push({ $sort: { rating: -1 } });
    }

    // Exclude certain fields from the results
    agg.push({ $project: { __v: 0, updatedAt: 0 } });
    return this.videoModel.aggregate(agg);
  }

  async playVideo(videoId: string): Promise<string> {
    const video = await this.videoModel.findById(videoId);
    if (!video) {
      throw new NotFoundException('Video not found');
    }

    const user = this.request.user;
    if (!user.dateOfBirth) {
      throw new ForbiddenException('User birth date not available');
    }

    const age = this.calculateAge(new Date(user.dateOfBirth));
    if (age < video.ageRestriction) {
      throw new ForbiddenException('You are not old enough to watch this video');
    }

    return video.url;
  }

  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
