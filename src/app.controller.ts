import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth } from './auth/decorators/auth.decorator';
import { AuthType } from './auth/enums/auth-type.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Auth(AuthType.None)
  @Get()
  public async sayHello() {
    return this.appService.getHello();
  }
}
