import { Controller, Post, UploadedFile, UseInterceptors, Body, BadRequestException, Headers } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { changeFileName, imageFileCheck, tesseract } from './helpers';
import { FileService } from './file.service';
import * as fs from 'fs/promises'
import { AuthUserService } from 'src/auth-user/auth-user.service';

@Controller('upload')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly authService: AuthUserService,
  ) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file',{
    limits: {fileSize: 10*1024*1024},
    storage: diskStorage({
      destination: './src/file/uploads',
      filename: changeFileName,
    }),
    fileFilter: imageFileCheck,
  }
))

  async uploadFile(@UploadedFile() file: Express.Multer.File, @Headers() token: string) {
    console.log(file)
    if (!file) {
      throw new BadRequestException('File is required');
    }
    if (!token) {
      throw new BadRequestException('Token is required');
    }

    const user = await this.authService.validateToken(token);
    if(!user) {
      throw new BadRequestException('Token is invalid');
    }
    const text = await this.fileService.createFile(file, user);
    return {text};
  }
}
