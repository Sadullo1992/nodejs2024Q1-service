import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { FavAlbum } from './entities/fav-album.entity';
import { FavArtist } from './entities/fav-artist.entity';
import { FavTrack } from './entities/fav-track.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([FavAlbum, FavArtist, FavTrack]),
    TrackModule,
    AlbumModule,
    ArtistModule,
  ],
})
export class FavsModule {}
