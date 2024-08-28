import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { Users } from 'src/users/user.entity';
import { ActiveUserType } from '../types/ActiveUserType';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  public async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn,
      },
    );
  }

  public async generateTokens(user: Users) {
    const [accessToken, refreshToken] = await Promise.all([
      // generate access token
      await this.signToken<Partial<ActiveUserType>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email },
      ),

      // generate refresh token
      await this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
