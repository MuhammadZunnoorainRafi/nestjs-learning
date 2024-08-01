import { Injectable } from '@nestjs/common';
import { GetUserParamsDto } from '../dtos/get-user-params.dto';

@Injectable()
export class UsersService {
  public getUserAll(
    getUserParamsDto: GetUserParamsDto,
    page: number,
    limit: number,
  ) {
    return [
      { name: 'John', email: 'johndoe@gmail.com' },
      { name: 'Tom', email: 'tom@gmail.com' },
    ];
  }
}
