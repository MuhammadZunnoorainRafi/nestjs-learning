import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Users } from '../user.entity';
import { RequestTimeoutException } from '@nestjs/common';

export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async createMany(createUserDto: CreateUserDto[]) {
    const users: Users[] = [];
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      for (const user of createUserDto) {
        const newUser = queryRunner.manager.create(Users, user);
        const result = await queryRunner.manager.save(newUser);
        users.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new RequestTimeoutException();
    } finally {
      await queryRunner.release();
    }
    return users;
  }
}
