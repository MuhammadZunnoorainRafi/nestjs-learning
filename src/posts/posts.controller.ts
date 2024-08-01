import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get('/:userId')
  getAll(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }
}
