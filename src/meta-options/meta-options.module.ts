import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptions } from './meta-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetaOptions])],
  controllers: [MetaOptionsController],
})
export class MetaOptionsModule {}
