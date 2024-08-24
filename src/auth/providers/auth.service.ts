import { Injectable } from '@nestjs/common';
import { SignInUsersDto } from '../dtos/sign-in-users.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(private readonly signInProvider: SignInProvider) {}

  public async signIn(signInUsersDto: SignInUsersDto) {
    return await this.signInProvider.signIn(signInUsersDto);
  }

  isAuth() {
    return true;
  }
}
