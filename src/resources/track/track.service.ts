import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackDatabase } from './track.database';

@Injectable()
export class TrackService {
  constructor(@Inject('TrackDatabase') private trackDatabase: TrackDatabase) {}

  create(createTrackDto: CreateTrackDto) {
    return this.trackDatabase.create(createTrackDto);
  }

  findAll() {
    return this.trackDatabase.findAll();
  }

  findOne(id: string) {
    return `This action returns a #${id} track`;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: string) {
    return `This action removes a #${id} track`;
  }
}
