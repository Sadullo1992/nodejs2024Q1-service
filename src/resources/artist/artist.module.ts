import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistDatabase } from './artist.database';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistDatabase',
      useClass: ArtistDatabase,
    },
  ],
})
export class ArtistModule {}
