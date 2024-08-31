import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  public async uploadFile(file: Express.Multer.File) {
    // Upload file to S3
    // Generate to new entry in database
  }
}
