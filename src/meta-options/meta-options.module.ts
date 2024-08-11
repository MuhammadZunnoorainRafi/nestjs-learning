import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptions } from './meta-option.entity';
import { MetaOptionsService } from './providers/meta-options.service';

@Module({
  imports: [TypeOrmModule.forFeature([MetaOptions])],
  controllers: [MetaOptionsController],
  providers: [MetaOptionsService],
})
export class MetaOptionsModule {}
