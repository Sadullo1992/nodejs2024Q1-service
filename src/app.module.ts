import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './resources/user/user.module';
import { TrackModule } from './resources/track/track.module';
import { ArtistModule } from './resources/artist/artist.module';
import { AlbumModule } from './resources/album/album.module';
import { FavsModule } from './resources/favs/favs.module';
import { AppDataSource } from '../ormconfig';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './resources/auth/auth.module';

const ormConfig = AppDataSource.options;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...ormConfig,
      entities: [`${__dirname}/resources/**/**.entity{.ts,.js}`],
      migrations: [`${__dirname}/migrations/*.ts`],
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    LoggerModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
