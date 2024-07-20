import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { AuthUserService } from 'src/auth-user/auth-user.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthUserModule } from 'src/auth-user/auth-user.module';
import { FileRepository } from './file.repository';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [DatabaseModule, AuthUserModule],
  controllers: [FileController],
  providers: [FileService, FileRepository, AuthUserService],
})
export class FileModule {}
