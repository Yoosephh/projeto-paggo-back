import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthUserRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async createUser(email: string, token: string): Promise<Users>{
    return await this.prisma.users.create({ data: { email, token }})
  }

  async findUser(email: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({ where: { email } });
  }

  async updateToken(email: string, token: string): Promise<Users> {
    return await this.prisma.users.update({ where: { email }, data: { token }})
  }

  async findUserByToken(token: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({ where: { token } });
  }
}
