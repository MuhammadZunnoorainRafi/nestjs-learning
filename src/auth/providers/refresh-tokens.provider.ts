import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { ActiveUserType } from '../types/ActiveUserType';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly generateTokensProvider: GenerateTokensProvider,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      // Verify the refresh token using jwt service

      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserType, 'sub'>
      >(refreshTokenDto.refreshToken, {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
      });
      // Fetch user from the database
      const user = await this.usersService.findOneById(sub);

      // Generate the tokens
      return await this.generateTokensProvider.generateTokens(user);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
