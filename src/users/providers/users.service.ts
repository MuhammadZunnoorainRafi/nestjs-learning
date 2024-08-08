import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUserParamsDto } from '../dtos/get-user-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
/**
 * Class to connect to users table and perform business operations
 */

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  /**
   * The method to get all the users from the database
   */

  public findAll(
    getUserParamsDto: GetUserParamsDto,
    page: number,
    limit: number,
  ) {
    const user = this.authService.isAuth();
    return [
      { name: 'John', email: 'johndoe@gmail.com' },
      { name: 'Tom', email: 'tom@gmail.com' },
    ];
  }

  /**
   * Find a single user using the ID of the user
   */

  public findOneById(id: string) {
    return { id, name: 'Zain', email: 'zain@gmail.com' };
  }
}
