import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ContentRepository } from './content.repository';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentRepository]),
    AuthModule
  ],
  controllers: [ContentsController],
  providers: [ContentsService]
})
export class ContentsModule {}
