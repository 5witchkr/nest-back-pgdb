import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentRepository])
  ],
  controllers: [ContentsController],
  providers: [ContentsService]
})
export class ContentsModule {}
