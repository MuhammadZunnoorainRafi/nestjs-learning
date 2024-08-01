import { Injectable } from '@nestjs/common';
import { GetUserParamsDto } from '../dtos/get-user-params.dto';

@Injectable()
export class UsersService {
  public findAll(
    getUserParamsDto: GetUserParamsDto,
    page: number,
    limit: number,
  ) {
    console.log({ getUserParamsDto, page, limit });

    return [
      { name: 'John', email: 'johndoe@gmail.com' },
      { name: 'Tom', email: 'tom@gmail.com' },
    ];
  }

  public findOneById(id: string) {
    return { id, name: 'Zain', email: 'zain@gmail.com' };
  }
}
