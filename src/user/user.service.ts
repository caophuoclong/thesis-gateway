import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getUser(id: string) {
    return {
      id: '123',
    };
  }
}
