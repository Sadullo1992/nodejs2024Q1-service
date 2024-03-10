import { Module } from '@nestjs/common';
import { TrackDatabaseService } from './track-database.service';
import { AlbumDatabaseService } from './album-database.service';
import { ArtistDatabaseService } from './artist-database.service';
import { FavsDatabaseService } from './favs-database.service';
import { UserDatabaseService } from './user-database.service';

@Module({
  providers: [
    TrackDatabaseService,
    AlbumDatabaseService,
    ArtistDatabaseService,
    FavsDatabaseService,
    UserDatabaseService,
  ],
  exports: [
    TrackDatabaseService,
    AlbumDatabaseService,
    ArtistDatabaseService,
    FavsDatabaseService,
    UserDatabaseService,
  ],
})
export class DatabaseModule {}
