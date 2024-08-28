import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      // verify the Google Token sent by User
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      console.log(loginTicket);
      // Extract the payload from Google JWT
      // const { email, sub: googleId } = loginTicket.getPayload();
      // // Find the user in the database using the GoogleId
      // const user = await this.usersService.findOneByGoogleId(googleId);
      // // If googleId exists generate tokens
      // if (user) {
      //   return await this.generateTokenProvider.generateTokens(user);
      // } else {
      //   // If not, create a new user and then generate tokens
      //   // const newUser = this.usersService.
      // }
    } catch (error) {
      console.log(error);
      // throw Unauthorized exception
      throw new UnauthorizedException('Internal Server Error');
    }
  }
}
