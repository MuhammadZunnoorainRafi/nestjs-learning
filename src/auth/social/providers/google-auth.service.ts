import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokenProvider } from 'src/auth/providers/generate-token.provider';

@Injectable()
export class GoogleAuthService implements OnModuleInit {
  private oauthClient: OAuth2Client;
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authentication(googleTokenDto: GoogleTokenDto) {
    try {
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Unauthorized');
    }
    // verify the Google Token sent by User
    const loginTicket = await this.oauthClient.verifyIdToken({
      idToken: googleTokenDto.token,
    });

    // Extract the payload from Google JWT
    const { email, sub: googleId } = loginTicket.getPayload();

    // Find the user in the database using the GoogleId
    const user = await this.usersService.findOneByGoogleId(googleId);

    // If googleId exists generate tokens
    if (user) {
      return await this.generateTokenProvider.generateTokens(user);
    } else {
      // If not, create a new user and then generate tokens
      // const newUser = this.usersService.
    }
    // throw Unauthorized exception
  }
}
