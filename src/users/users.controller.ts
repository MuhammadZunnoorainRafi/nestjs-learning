import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

// http://localhost:3000/users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/:id?')
  getUsers(
    @Param() getUserParamsDto: GetUserParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.getUserAll(getUserParamsDto, limit, page);
  }

  @Post()
  postUsers(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return createUserDto;
  }

  @Patch()
  patchUsers(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return patchUserDto;
  }
}
