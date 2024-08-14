import { forwardRef, Inject, Injectable } from '@nestjs/common';
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
    const userExists = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }

  /**
   * The method to get all the users from the database
   */
  public findAll(
    getUserParamsDto: GetUserParamsDto,
    page: number,
    limit: number,
  ) {
    const environment = this.configService.get('TEST');
    console.log(environment);

    const user = this.authService.isAuth();
    return [
      { name: 'John', email: 'johndoe@gmail.com' },
      { name: 'Tom', email: 'tom@gmail.com' },
    ];
  }

  /**
   * Find a single user using the ID of the user
   */
  public async findOneById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }
}
