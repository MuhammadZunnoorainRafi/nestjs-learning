import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class GetUserParamsDto {
  @ApiPropertyOptional({
    description: 'Get user with a specific id',
    example: 1234,
  })
  @IsOptional()
  @IsInt()
  id?: number;
}
