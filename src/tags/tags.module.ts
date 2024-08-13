import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './tag.entity';
import { TagsService } from './providers/tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tags])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
