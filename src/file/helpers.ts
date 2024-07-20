import { Request } from 'express';
import { extname } from 'path';

export function imageFileCheck(req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void): void {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
}

export function changeFileName(req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void): void {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
}