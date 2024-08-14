import {
  Body,
  Controller,
  Delete,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagsDto } from './dtos/create-tags.dto';

@Controller('/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public createTag(@Body() createTagDto: CreateTagsDto) {
    return this.tagsService.create(createTagDto);
  }

  @Delete()
  public deleteTag(@Query('id', ParseUUIDPipe) id: string) {
    return this.tagsService.delete(id);
  }
}
