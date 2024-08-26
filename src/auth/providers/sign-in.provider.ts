import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { SignInUsersDto } from '../dtos/sign-in-users.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserType } from '../types/ActiveUserType';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
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
        throw new UnauthorizedException('Password not matched');
      }
      const accessToken = await this.jwtService.signAsync(
        { sub: userExists.id, email: userExists.email } as ActiveUserType,
        {
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.accessTokenTtl,
        },
      );
      return { accessToken };
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
