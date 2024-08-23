import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { UsersService } from './providers/users.service';
import { Users } from './user.entity';
import { UsersController } from './users.controller';
import { CreatUserProvider } from './providers/create-user.provider';
import { FindOneUserProvider } from './providers/find-one-user.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyProvider,
    CreatUserProvider,
    FindOneUserProvider,
  ],
  exports: [UsersService],
  imports: [
    PaginationModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Users]),
  ],
})
export class UsersModule {}
