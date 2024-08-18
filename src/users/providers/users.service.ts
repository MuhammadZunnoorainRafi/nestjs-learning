import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUserParamsDto } from '../dtos/get-user-params.dto';
import { Users } from '../user.entity';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUserDto } from '../dtos/create-many-user.dto';
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
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (userExists) {
        throw new BadRequestException(
          'The user already exists, please check your email.',
        );
      }

      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      );
    }
  }

  /**
   * The method to get all the users from the database
   */
  public findAll(
    getUserParamsDto: GetUserParamsDto,
    page: number,
    limit: number,
  ) {
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
