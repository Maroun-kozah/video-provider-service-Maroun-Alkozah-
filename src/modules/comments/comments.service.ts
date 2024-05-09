import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comments.schema';
import { VideosService } from '../videos/videos.service';
import { REQUEST } from '@nestjs/core';
import { UserRequest } from '../../common/types';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(REQUEST) private readonly request: UserRequest,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private videosService: VideosService,
  ) {}

  async createComment(body: CreateCommentDto, videoId: string) {
    const video = await this.videosService.findVideoById(videoId);
    if (!video) {
      throw new NotFoundException('Video does not exist');
    }

    const comment = new this.commentModel({
      ...body,
      videoId: videoId,
      userId: this.request.user._id,
    });
    return comment.save();
  }

  async updateComment(body: UpdateCommentDto, commentId: string) {
    const comment = await this.commentModel.findOneAndUpdate(
      {
        _id: commentId,
        userId: this.request.user._id,
      },
      { text: body.text },
      { new: true },
    );
    if (!comment) {
      throw new NotFoundException('Comment does not exist');
    }
    return comment;
  }

  async replyComment(body: CreateCommentDto, commentId: string) {
    const parentComment = await this.commentModel.findById(commentId);
    if (!parentComment) {
      throw new NotFoundException('Comment does not exist');
    }

    const reply = new this.commentModel({
      ...body,
      videoId: parentComment.videoId,
      parentId: commentId,
      userId: this.request.user._id,
    });
    return reply.save();
  }

  async viewAllComments(videoId: string) {
    return this.commentModel.aggregate([
      { $match: { videoId: videoId } },
      { $sort: { createdAt: -1 } },
      { $project: { __v: 0, updatedAt: 0 } },  // Optionally hide updatedAt if not needed
    ]);
  }
}
