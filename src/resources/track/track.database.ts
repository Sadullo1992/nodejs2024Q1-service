import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
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

  findOne(id: string) {
    const track = this.tracks.find((item) => item.id === id);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) return;

    const updatedTrack = {
      ...this.tracks[index],
      ...updateTrackDto,
    };
    this.tracks[index] = updatedTrack;

    return updatedTrack;
  }

  remove(id: string) {
    const indexForDeletion = this.tracks.findIndex((track) => track.id === id);
    if (indexForDeletion === -1) return false;

    this.tracks.splice(indexForDeletion, 1);
    return true;
  }
}
