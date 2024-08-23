import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-users.dto';
import { Users } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreatUserProvider {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}
  public async createUser(creatUserDto: CreateUserDto) {
    try {
      const existingUser = await this.usersRepository.findOneBy({
        email: creatUserDto.email,
      });
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }
      const hashedPassword = await this.hashingProvider.hashPassword(
        creatUserDto.password,
      );
      const newUser = this.usersRepository.create({
        ...creatUserDto,
        password: hashedPassword,
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new RequestTimeoutException('Internal Server Error');
    }
  }
}
