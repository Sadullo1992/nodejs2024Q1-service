import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fav } from './entities/fav.entity';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [
    TypeOrmModule.forFeature([Fav]),
    TrackModule,
    AlbumModule,
    ArtistModule,
  ],
})
export class FavsModule {}
