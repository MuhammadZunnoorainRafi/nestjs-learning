import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateManyUserDto } from '../dtos/create-many-users.dto';
import { Users } from '../user.entity';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private dataSource: DataSource) {}

  public async createMany(createMantUserDto: CreateManyUserDto) {
    const users: Users[] = [];
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
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
      throw new ConflictException('Could not complete the transaction', {
        description: error,
      });
    } finally {
      await queryRunner.release();
    }
    return users;
  }
}
