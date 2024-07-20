import { Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { Users } from '@prisma/client';
import { tesseract } from './helpers';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  async createFile(file: Express.Multer.File, user: Users) {
    try {
      const {text, jobId} = await tesseract(file.path);

      await this.fileRepository.saveText(file.filename, text, user.id, jobId);
  
      return {text}
    } catch (err) {
      throw new Error('Something gone wrong. Please, try again')
    }
    
  }
}
