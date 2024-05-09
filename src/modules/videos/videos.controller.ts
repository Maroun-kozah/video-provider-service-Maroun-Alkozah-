import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { VideosService } from './videos.service';
import { GetVideosDto } from './dto/get-videos.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('/play/:id')
  async playVideo(@Param('id') videoId: string) {
    return this.videosService.playVideo(videoId);  // Correctly pass videoId
  }

  @Get('/all')
  async getVideos(@Query() getVideosDto: GetVideosDto) {
    return this.videosService.getVideos(getVideosDto);  // Use getVideosDto for clarity
  }
}
