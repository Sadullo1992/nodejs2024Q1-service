import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavsDatabaseService } from 'src/database/favs-database.service';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
    private favsDatabase: FavsDatabaseService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const modelTrack = await this.trackRepository.create(createTrackDto).save();
    return modelTrack;
  }

  async findAll() {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);

    Object.keys(updateTrackDto).forEach((key) => {
      track[key] = updateTrackDto[key];
    });
    const data = await track.save();

    return data;
  }

  async remove(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    await track.remove();
    // should remove from fav
    this.favsDatabase.removeTrackId(id);
  }
}
