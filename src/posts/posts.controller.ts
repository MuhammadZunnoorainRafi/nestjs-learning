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
import { CreatePostDto } from './dtos/create-posts.dto';
import { PatchPostDto } from './dtos/patch-posts.dto';
import { GetPostsQueryDto } from './dtos/get-posts-query.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserType } from 'src/auth/types/ActiveUserType';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getAll(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsQueryDto,
  ) {
    return this.postsService.findAll(postQuery);
  }

  @ApiOperation({ summary: 'Creates a new blog post' })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created successfully',
  })
  @Post()
  createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserType,
  ) {
    return this.postsService.createPost(createPostDto, user);
  }

  @ApiOperation({ summary: 'Updates an existing blog post' })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response if your post is updated successfully',
  })
  @Patch()
  patchPost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  @Delete()
  deletePost(@Query('id', ParseUUIDPipe) id: string) {
    return this.postsService.delete(id);
  }
}
