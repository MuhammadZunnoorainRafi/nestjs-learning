import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import jwtConfig from './config/jwt.config';
import { AuthService } from './providers/auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { HashingProvider } from './providers/hashing.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { GenerateTokenProvider } from './providers/generate-token.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { GoogleAuthController } from './social/google-auth.controller';
import { GoogleAuthService } from './social/providers/google-auth.service';

@Module({
  controllers: [AuthController, GoogleAuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    SignInProvider,
    GenerateTokenProvider,
    RefreshTokensProvider,
    GoogleAuthService,
  ],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get('jwt.secret'),
    //     audience: configService.get('jwt.audience'),
    //     issuer: configService.get('jwt.issuer'),
    //     accessTokenTtl: configService.get('jwt.jwtAccessTokenTtl'),
    //   }),
    // }),
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
