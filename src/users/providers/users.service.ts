import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUserParamsDto } from '../dtos/get-user-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { Users } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
/**
 * Class to connect to users table and perform business operations
 */

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (userExists) {
        return new BadRequestException(
          'The user already exists, please check your email.',
        ).getResponse();
      }

      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      return new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      ).getResponse();
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
}
