import {
  Body,
  Controller,
  Get,
  Headers,
  Ip,
  Param,
  Post,
  Query,
} from '@nestjs/common';

// http://localhost:3000/users
@Controller('users')
export class UsersController {
  @Get('/:id')
  getUsers(@Param('id') id: any, @Query('limit') limit: any) {
    console.log({ id, limit });
    return 'Get request for users controller';
  }

  @Post()
  postUsers(@Body() request: any, @Headers() header: any, @Ip() ip: any) {
    console.log(request, header, ip);
    return 'Post request for users controller';
  }
}
