import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Posts } from '../post.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    // Get User
    const author = await this.usersService.findOneById(createPostDto.authorId);

    // Get Tags
    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    const post = this.postRepository.create({ ...createPostDto, author, tags });
    return await this.postRepository.save(post);
  }

  public async delete(id: string) {
    await this.postRepository.delete({ id });
    return { deleted: true };
  }

  public async update(patchPostDto: PatchPostDto) {
    // find tags
    const tags = await this.tagsService.findMultipleTags(patchPostDto.tags);

    // find post
    const post = await this.postRepository.findOneBy({ id: patchPostDto.id });

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
  }

  public async findAll() {
    const posts = await this.postRepository.find({
      // relations: { metaOptions: true },
    });

    return posts;
  }
}
