import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [DatabaseModule, TrackModule, AlbumModule],
  exports: [ArtistService],
})
export class ArtistModule {}
