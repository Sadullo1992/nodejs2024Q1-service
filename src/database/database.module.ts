import { Module } from '@nestjs/common';
import { TrackDatabaseService } from './track-database.service';
import { AlbumDatabaseService } from './album-database.service';
import { ArtistDatabaseService } from './artist-database.service';
import { FavsDatabaseService } from './favs-database.service';

@Module({
  providers: [
    TrackDatabaseService,
    AlbumDatabaseService,
    ArtistDatabaseService,
    FavsDatabaseService,
  ],
  exports: [
    TrackDatabaseService,
    AlbumDatabaseService,
    ArtistDatabaseService,
    FavsDatabaseService,
  ],
})
export class DatabaseModule {}
