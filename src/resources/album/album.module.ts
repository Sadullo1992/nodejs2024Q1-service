import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumDatabase } from './album.database';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumDatabase',
      useClass: AlbumDatabase,
    },
  ],
  imports: [TrackModule],
  exports: [AlbumService],
})
export class AlbumModule {}
