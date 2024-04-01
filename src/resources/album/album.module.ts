import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [AuthModule, TypeOrmModule.forFeature([Album])],
  exports: [AlbumService],
})
export class AlbumModule {}
