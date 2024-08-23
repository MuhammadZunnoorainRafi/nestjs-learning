import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneUserProvider {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  public async byEmail(email: string) {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return user;
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new RequestTimeoutException('Internal Server Error');
    }
  }
}
