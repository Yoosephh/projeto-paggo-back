import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class FileRepository {
  constructor(private readonly prisma: DatabaseService){} 

  async saveText(fileName: string, text: string, userId: number, workerId: string) {
    return await this.prisma.texts.create({
      data: {
        fileName, 
        text,
        userId,
        workerId
      }
    })
  }

  async findTextByWorker(jobId: string) {
    return await this.prisma.texts.findFirst({
      where: {
        
      }
    })
  }
}