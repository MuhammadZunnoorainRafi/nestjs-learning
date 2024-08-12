import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Posts } from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [UsersModule, TypeOrmModule.forFeature([Posts])],
})
export class PostsModule {}
