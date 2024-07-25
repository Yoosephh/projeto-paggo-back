import { Request } from 'express';
import { extname } from 'path';
const { createWorker } = require('tesseract.js');

export async function imageFileCheck(req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void): Promise<void> {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
}

export function changeFileName(req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
}

export async function tesseract(filePath: string): Promise<{jobId, text}> {
  const worker = await createWorker([
    'eng',
    'por',
    'spa',
    'jpn',
    'deu',
  ], 3);  
  const response = await worker.recognize(filePath);
  const {jobId, data:{text}} = response;
  await worker.terminate();
  
  return {text, jobId}
}