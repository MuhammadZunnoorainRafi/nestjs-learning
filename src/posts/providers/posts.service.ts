import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  findAll(userId: string) {
    console.log(userId);
    return 'Hello Get Post';
  }
}
