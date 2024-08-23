import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInUsersDto } from '../dtos/sign-in-users.dto';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async signIn(signInUsersDto: SignInUsersDto) {
    try {
      const userExists = await this.userService.findOneUserByEmail(
        signInUsersDto.email,
      );

      if (!userExists) {
        throw new BadRequestException('User not found, Please Sign In');
      }

      const passwordMatched = await this.hashingProvider.comparePassword(
        signInUsersDto.password,
        userExists.password,
      );

      if (!passwordMatched) {
        throw new BadRequestException('Password not matched');
      }
      return userExists;
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new RequestTimeoutException('Internal Server Error');
    }
  }

  isAuth() {
    return true;
  }
}
