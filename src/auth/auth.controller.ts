import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInUsersDto } from './dtos/sign-in-users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  public async signInUser(@Body() signInUsersDto: SignInUsersDto) {
    return this.authService.signIn(signInUsersDto);
  }
}
