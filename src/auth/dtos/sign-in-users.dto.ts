import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInUsersDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
