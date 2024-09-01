import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Upload } from '../upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { UploadFileType } from '../types/upload-file.type';
import { FileTypesEnum } from '../enums/file-types.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadsService {
  constructor(
    private readonly uploadToAwsProvider: UploadToAwsProvider,
    private readonly configService: ConfigService,
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}
  public async uploadFile(file: Express.Multer.File) {
    try {
      // Throw error for unsupported MIME types
      if (
        !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
          file.mimetype,
        )
      ) {
        throw new BadRequestException('MIME type not supported');
      }
      // Upload file to S3
      const name = await this.uploadToAwsProvider.uploadFile(file);
      // Generate to new entry in database
      const uploadFile: UploadFileType = {
        name: name,
        path: `${this.configService.get('appConfig.baseImageUrl')}/${name}`,
        mime: file.mimetype,
        size: file.size,
        type: FileTypesEnum.IMAGE,
      };
      const newFileUpload = this.uploadRepository.create(uploadFile);
      return await this.uploadRepository.save(newFileUpload);
    } catch (error) {
      console.log(error);
      throw new ConflictException(error);
    }
  }
}
