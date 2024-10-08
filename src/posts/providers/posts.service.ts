import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserType } from 'src/auth/types/ActiveUserType';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-posts.dto';
import { GetPostsQueryDto } from '../dtos/get-posts-query.dto';
import { PatchPostDto } from '../dtos/patch-posts.dto';
import { Posts } from '../post.entity';
import { CreatePostProvider } from './create-post.provider';

@Injectable()
export class PostsService {
  constructor(
    private readonly tagsService: TagsService,
    private readonly paginationProvider: PaginationProvider,
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
    private readonly createPostProvider: CreatePostProvider,
  ) {}

  public async createPost(createPostDto: CreatePostDto, user: ActiveUserType) {
    return this.createPostProvider.createPost(createPostDto, user);
  }

  public async delete(id: string) {
    await this.postRepository.delete({ id });
    return { deleted: true };
  }

  public async update(patchPostDto: PatchPostDto) {
    try {
      // find tags
      const tags = await this.tagsService.findMultipleTags(patchPostDto.tags);

      if (!tags || tags.length !== patchPostDto.tags.length) {
        throw new BadRequestException(
          'Please check your tag Ids and ensure they are correct',
        );
      }

      // find post
      const post = await this.postRepository.findOneBy({ id: patchPostDto.id });

      if (!post) {
        throw new BadRequestException('The post Id does not exists');
      }

      // update post
      post.title = patchPostDto.title ?? post.title;
      post.content = patchPostDto.content ?? post.content;
      post.status = patchPostDto.status ?? post.status;
      post.postType = patchPostDto.postType ?? post.postType;
      post.slug = patchPostDto.slug ?? post.slug;
      post.featuredImageUrl =
        patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
      post.publishOn = patchPostDto.publishOn ?? post.publishOn;

      // update tags
      post.tags = tags;

      // save updated post to database
      return await this.postRepository.save(post);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      );
    }
  }

  public async findAll(postQuery: GetPostsQueryDto) {
    const posts = await this.paginationProvider.paginateQuery(
      { page: postQuery.page, limit: 2 },
      this.postRepository,
    );

    return posts;
  }
}
