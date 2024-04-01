import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [AuthModule, TypeOrmModule.forFeature([Track])],
  exports: [TrackService],
})
export class TrackModule {}
