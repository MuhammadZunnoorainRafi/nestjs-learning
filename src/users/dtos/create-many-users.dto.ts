import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-users.dto';
import { Type } from 'class-transformer';

export class CreateManyUserDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
