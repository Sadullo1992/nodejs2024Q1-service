import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { FavsDatabase } from './favs.database';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [FavsController],
  providers: [
    FavsService,
    {
      provide: 'FavsDatabase',
      useClass: FavsDatabase,
    },
  ],
  imports: [ArtistModule, AlbumModule, TrackModule],
})
export class FavsModule {}
