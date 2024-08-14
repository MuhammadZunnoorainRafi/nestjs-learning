import { Injectable } from '@nestjs/common';
import { CreateTagsDto } from '../dtos/create-tags.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from '../tag.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
  ) {}

  public async create(createTagsDto: CreateTagsDto) {
    const tag = this.tagsRepository.create(createTagsDto);
    return await this.tagsRepository.save(tag);
  }

  public async findMultipleTags(tagsIds: string[]) {
    const tags = await this.tagsRepository.find({
      where: { id: In(tagsIds) },
    });

    return tags;
  }

  public async delete(id: string) {
    await this.tagsRepository.delete({ id });
    return { deleted: true };
  }
}
