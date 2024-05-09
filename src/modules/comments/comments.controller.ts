import { Controller, Post, Body, Param, Put, Get } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create/:id')
  async createComment(@Body() body: CreateCommentDto, @Param('id') videoId: string) {
    return this.commentsService.createComment(body, videoId);
  }

  @Post('reply/:id')
  async replyComment(@Body() body: CreateCommentDto, @Param('id') commentId: string) {
    return this.commentsService.replyComment(body, commentId);
  }

  @Put('update/:id')
  async updateComment(@Body() body: UpdateCommentDto, @Param('id') commentId: string) {
    return this.commentsService.updateComment(body, commentId);
  }

  @Get('view/:id')
  async viewAllComments(@Param('id') videoId: string) {
    return this.commentsService.viewAllComments(videoId);
  }
}
