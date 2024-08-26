import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserType } from 'src/auth/types/ActiveUserType';
import { TagsService } from 'src/tags/providers/tags.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-posts.dto';
import { Posts } from '../post.entity';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    private readonly tagsService: TagsService,
  ) {}
  public async createPost(createPostDto: CreatePostDto, user: ActiveUserType) {
    try {
      console.log({ user });
      const author = await this.usersService.findOneById(user.sub);

      const tags = await this.tagsService.findMultipleTags(createPostDto.tags);
      if (!tags || tags.length !== createPostDto.tags.length) {
        throw new BadRequestException('Tags not found');
      }

      const newPost = this.postsRepository.create({
        ...createPostDto,
        author,
        tags,
      });
      return await this.postsRepository.save(newPost);
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('Internal Server Error');
    }
  }
}
