import { Controller, Get } from '@nestjs/common';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/')
  getAuth() {
    return this.authService.login('john@gmail.com', 'asdfkj', '123412');
  }
}
