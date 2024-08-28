import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleUserType } from '../types/google-user.type';

@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  public async createGoogleUser(googleUser: GoogleUserType) {
    try {
      const newUser = this.userRepository.create(googleUser);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw new ConflictException('User not created');
    }
  }
}
