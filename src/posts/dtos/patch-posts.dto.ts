import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreatePostDto } from './create-posts.dto';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ description: 'The ID of the post that needs to be updated' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
