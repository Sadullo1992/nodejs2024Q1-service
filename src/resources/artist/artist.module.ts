import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [AuthModule, TypeOrmModule.forFeature([Artist])],
  exports: [ArtistService],
})
export class ArtistModule {}
