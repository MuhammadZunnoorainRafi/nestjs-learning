import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { GoogleAuthService } from './providers/google-auth.service';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}
  @Post()
  public async authenticate(@Body() googleTokenDto: GoogleTokenDto) {
    this.googleAuthService.onModuleInit();
    return await this.googleAuthService.authenticate(googleTokenDto);
  }
}
