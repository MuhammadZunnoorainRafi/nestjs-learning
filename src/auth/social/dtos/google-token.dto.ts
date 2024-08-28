import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GoogleTokenDto {
  @IsString()
  @MaxLength(512)
  @IsNotEmpty()
  token: string;
}
