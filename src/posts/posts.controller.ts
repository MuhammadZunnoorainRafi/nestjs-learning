import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getAll(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @ApiOperation({ summary: 'Creates a new blog post' })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created successfully',
  })
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Updates an existing blog post' })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response if your post is updated successfully',
  })
  @Patch()
  patchPost(@Body() patchPostDto: PatchPostDto) {
    return patchPostDto;
  }

  @Delete()
  deletePost(@Query('id', ParseUUIDPipe) id: string) {
    return this.postsService.delete(id);
  }
}
