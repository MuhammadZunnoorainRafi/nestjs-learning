import { Injectable } from '@nestjs/common';
import { CreateTagsDto } from '../dtos/create-tags.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from '../tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
  ) {}

  public async create(createTagsDto: CreateTagsDto) {
    let tag = this.tagsRepository.create(createTagsDto);
    tag = await this.tagsRepository.save(tag);
    return tag;
  }
}
