import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { AuthUserModule } from './auth-user/auth-user.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [FileModule, DatabaseModule, AuthUserModule],
  providers: [DatabaseService],
})
export class AppModule {}
