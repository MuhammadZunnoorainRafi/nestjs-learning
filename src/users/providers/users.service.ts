import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManyUserDto } from '../dtos/create-many-users.dto';
import { CreateUserDto } from '../dtos/create-users.dto';
import { GetUserParamsDto } from '../dtos/get-users-params.dto';
import { GoogleUserType } from '../types/google-user.type';
import { Users } from '../user.entity';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { CreatUserProvider } from './create-user.provider';
import { FindOneByGoogleId } from './find-one-by-google-id.provider';
import { FindOneUserProvider } from './find-one-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
/**
 * Class to connect to users table and perform business operations
 */

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    private readonly createUserProvider: CreatUserProvider,
    private readonly findOneUserProvider: FindOneUserProvider,
    private readonly findOneByGoogleIdProvider: FindOneByGoogleId,
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /**
   * The method to get all the users from the database
   */
  public async findAll(
    getUserParamsDto: GetUserParamsDto,
    limit: number,
    page: number,
  ) {
    // try {
    //   const response = await this.paginationService.paginateQuery(
    //     { page, limit: 2 },
    //     this.userRepository,
    //   );
    //   return response;
    // } catch (error) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.MOVED_PERMANENTLY,
    //       error: 'The API endpoint does not exist',
    //       fileName: 'users.service.ts',
    //       lineNumber: 88,
    //     },
    //     HttpStatus.MOVED_PERMANENTLY,
    //     {
    //       cause: new Error(),
    //       description: 'Occured because the API endpoint was permanently moved',
    //     },
    //   );
    // }
    console.log('findAll user service');
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

  public async findOneUserByEmail(email: string) {
    return await this.findOneUserProvider.byEmail(email);
  }

  public async createMany(createManyUserDto: CreateManyUserDto) {
    return await this.usersCreateManyProvider.createMany(createManyUserDto);
  }

  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser: GoogleUserType) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
