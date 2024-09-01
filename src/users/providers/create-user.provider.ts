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
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreatUserProvider {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    private readonly mailService: MailService,
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
      let newUser = this.usersRepository.create({
        ...creatUserDto,
        password: hashedPassword,
      });
      newUser = await this.usersRepository.save(newUser);
      await this.mailService.sendUserWelcomeEmail(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new RequestTimeoutException('Internal Server Error');
    }
  }
}
