import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistDatabase } from './artist.database';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistDatabase',
      useClass: ArtistDatabase,
    },
  ],
  imports: [TrackModule, AlbumModule],
  exports: [ArtistService],
})
export class ArtistModule {}
