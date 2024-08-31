import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import path from 'path';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
  constructor(private readonly configService: ConfigService) {}
  public async uploadFile(file: Express.Multer.File) {
    try {
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('appConfig.awsBucketName'),
          Key: this.generateFileName(file),
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();
      return uploadResult.Key;
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('Internal Server Error');
    }
  }

  private generateFileName(file: Express.Multer.File) {
    // Extract file name
    const name = file.originalname.split('.')[0];
    // Remove white spaces
    name.replace(/\s/g, '').trim();
    // Extract extension
    const extension = path.extname(file.originalname);
    // Generate time stamp
    const date = new Date().getTime().toString().trim();
    // Return file uuid
    return `${name}-${date}-${uuidV4()}${extension}`;
  }
}
