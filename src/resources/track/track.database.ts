import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { ITrack } from './track.interface';

@Injectable()
export class TrackDatabase {
  private readonly tracks: ITrack[] = [];

  create(createUserDto: CreateTrackDto) {
    const track = {
      id: uuidv4(),
      ...createUserDto,
    };
    this.tracks.push(track);

    return track;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {}

  update(id: string, newPassword: string) {}

  remove(id: string) {}
}
