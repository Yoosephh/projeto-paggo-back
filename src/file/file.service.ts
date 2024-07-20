import { Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  private readonly fileRepository: FileRepository
}
