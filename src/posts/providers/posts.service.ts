import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Posts } from '../post.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    return await this.postRepository.save(post);
  }

  public async delete(id: string) {
    await this.postRepository.delete({ id });
    return { deleted: true };
  }

  public async findAll(userId: string) {
    const user = this.usersService.findOneById(userId);

    const posts = await this.postRepository.find({
      // relations: { metaOptions: true },
    });

    return posts;
  }
}
