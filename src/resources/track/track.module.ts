import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackDatabase } from './track.database';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'TrackDatabase',
      useClass: TrackDatabase,
    },
  ],
  exports: [TrackService],
})
export class TrackModule {}
