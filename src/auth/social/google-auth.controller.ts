import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthService } from './providers/google-auth.service';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Post()
  public async authenticate(@Body() googleTokenDto: GoogleTokenDto) {
    return await this.googleAuthService.authentication(googleTokenDto);
  }
}
