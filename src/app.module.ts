import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './resources/user/user.module';
import { TrackModule } from './resources/track/track.module';
import { ArtistModule } from './resources/artist/artist.module';
import { AlbumModule } from './resources/album/album.module';
import { FavsModule } from './resources/favs/favs.module';
import { typeOrmConfig } from './ormconfig';
import { User } from './resources/user/entities/user.entity';
import { Track } from './resources/track/entities/track.entity';
import { Artist } from './resources/artist/entities/artist.entity';
import { Album } from './resources/album/entities/album.entity';
import { Fav } from './resources/favs/entities/fav.entity';

const ormConfig = typeOrmConfig();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...ormConfig,
      entities: [
        User,
        Track,
        Artist,
        Album,
        Fav,
        // `${__dirname}/resources/**/**.entity{.ts,.js}`
      ],
      migrations: [],
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
