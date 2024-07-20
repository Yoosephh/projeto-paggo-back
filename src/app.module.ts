import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { AuthUserModule } from './auth-user/auth-user.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [FileModule, AuthUserModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
