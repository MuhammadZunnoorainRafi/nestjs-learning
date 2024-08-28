import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatUserProvider } from './providers/create-user.provider';
import { FindOneUserProvider } from './providers/find-one-user.provider';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { UsersService } from './providers/users.service';
import { Users } from './user.entity';
import { UsersController } from './users.controller';
import { FindOneByGoogleId } from './providers/find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyProvider,
    CreatUserProvider,
    FindOneUserProvider,
    FindOneByGoogleId,
    CreateGoogleUserProvider,
  ],
  exports: [UsersService],
  imports: [
    PaginationModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Users]),
  ],
})
export class UsersModule {}
