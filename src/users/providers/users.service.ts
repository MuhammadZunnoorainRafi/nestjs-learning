import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { PaginationService } from 'src/common/pagination/providers/pagination.service';
import { Repository } from 'typeorm';
import { CreateManyUserDto } from '../dtos/create-many-users.dto';
import { CreateUserDto } from '../dtos/create-users.dto';
import { GetUserParamsDto } from '../dtos/get-users-params.dto';
import { Users } from '../user.entity';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreatUserProvider } from './create-user.provider';
/**
 * Class to connect to users table and perform business operations
 */

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    private readonly paginationService: PaginationService,
    private readonly createUserProvider: CreatUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.create(createUserDto);
  }

  /**
   * The method to get all the users from the database
   */
  public async findAll(
    getUserParamsDto: GetUserParamsDto,
    limit: number,
    page: number,
  ) {
    try {
      const response = await this.paginationService.paginateQuery(
        { page, limit: 2 },
        this.userRepository,
      );
      return response;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.MOVED_PERMANENTLY,
          error: 'The API endpoint does not exist',
          fileName: 'users.service.ts',
          lineNumber: 88,
        },
        HttpStatus.MOVED_PERMANENTLY,
        {
          cause: new Error(),
          description: 'Occured because the API endpoint was permanently moved',
        },
      );
    }
  }

  /**
   * Find a single user using the ID of the user
   */
  public async findOneById(id: string) {
    // try {
    return await this.userRepository.findOneBy({ id });
    // if (!user) {
    //   return new NotFoundException('User not found').getResponse();
    // }
    // return user;
    // } catch (error) {
    //   return new RequestTimeoutException(
    //     'Unable to process your request at the moment please try later',
    //     {
    //       description: 'Error connecting to the the datbase',
    //     },
    //   ).getResponse();
    // }
  }

  public async createMany(createManyUserDto: CreateManyUserDto) {
    return await this.usersCreateManyProvider.createMany(createManyUserDto);
  }
}
