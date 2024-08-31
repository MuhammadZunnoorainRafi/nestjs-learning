import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './providers/uploads.provider';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
