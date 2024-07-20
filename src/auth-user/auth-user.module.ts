import { Module } from '@nestjs/common';
import { AuthUserController } from './auth-user.controller';
import { AuthUserService } from './auth-user.service';
import { AuthUserRepository } from './auth-user.repository';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [AuthUserController],
  providers: [AuthUserService, AuthUserRepository, DatabaseService],
  exports: [AuthUserService, AuthUserRepository]
})
export class AuthUserModule {}
