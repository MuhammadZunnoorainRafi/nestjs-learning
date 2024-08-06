import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUserParamsDto } from '../dtos/get-user-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public findAll(
    getUserParamsDto: GetUserParamsDto,
    page: number,
    limit: number,
  ) {
    const user = this.authService.isAuth();
    console.log(typeof getUserParamsDto.id);
    return [
      { name: 'John', email: 'johndoe@gmail.com' },
      { name: 'Tom', email: 'tom@gmail.com' },
    ];
  }

  public findOneById(id: string) {
    return { id, name: 'Zain', email: 'zain@gmail.com' };
  }
}
