import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistDatabase } from './artist.database';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistDatabase',
      useClass: ArtistDatabase,
    },
  ],
  imports: [TrackModule],
})
export class ArtistModule {}
