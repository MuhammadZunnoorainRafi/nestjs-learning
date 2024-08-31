import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './providers/uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadService: UploadsService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadService.uploadFile(file);
  }
}
