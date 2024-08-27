import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInUsersDto } from '../dtos/sign-in-users.dto';
import { GenerateTokenProvider } from './generate-token.provider';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly generateTokenProvider: GenerateTokenProvider,
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
        throw new UnauthorizedException('Incorrect Password');
      }

      return await this.generateTokenProvider.generateTokens(userExists);
    } catch (error) {
      console.log(error);
      if (
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new RequestTimeoutException('Internal Server Error');
    }
  }
}
