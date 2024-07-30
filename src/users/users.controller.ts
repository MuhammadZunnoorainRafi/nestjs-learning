import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';

// http://localhost:3000/users
@Controller('users')
export class UsersController {
  @Get('/:id?')
  getUsers(
    @Param() getUserParamsDto: GetUserParamsDto,
    @Query('limit') limit: any,
  ) {
    console.log({ getUserParamsDto, limit });
    return 'Get request for users controller';
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
