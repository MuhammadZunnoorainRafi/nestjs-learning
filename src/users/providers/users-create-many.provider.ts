import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Users } from '../user.entity';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateManyUserDto } from '../dtos/create-many-user.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private dataSource: DataSource) {}

  public async createMany(createMantUserDto: CreateManyUserDto) {
    const users: Users[] = [];
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      for (const user of createMantUserDto.users) {
        const newUser = queryRunner.manager.create(Users, user);
        const result = await queryRunner.manager.save(newUser);
        users.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      );
    } finally {
      await queryRunner.release();
    }
    return users;
  }
}
