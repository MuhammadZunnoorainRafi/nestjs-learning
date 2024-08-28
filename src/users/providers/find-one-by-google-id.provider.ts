import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneByGoogleId {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}
  public async findOneByGoogleId(googleId: string) {
    return await this.userRepository.findOneBy({ googleId });
  }
}
