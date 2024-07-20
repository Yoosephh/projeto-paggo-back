import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { changeFileName, imageFileCheck } from './helpers';
import { diskStorage } from 'multer';
import { AuthUserService } from 'src/auth-user/auth-user.service';
import { FileService } from './file.service';

@Controller('upload')
export class FileController { 
  constructor(
    private readonly fileService: FileService,
    private readonly authService: AuthUserService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: changeFileName,
    }),
    fileFilter: imageFileCheck,
  }))

  async uploadFile(@UploadedFile() file: Express.Multer.File, @Headers('authorization') token: string,): Promise<{success: boolean, data: any}> {
    await this.authService.validateToken(token);

    return await this.fileService
  }
}
