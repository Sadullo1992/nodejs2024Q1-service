import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomNotFoundException } from 'src/exceptions/custom-not-found.exception';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  async isExist(id: string) {
    const resp = await this.trackRepository.findOne({ where: { id } });
    if (!resp) {
      throw new HttpException(
        'Track ID not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return !!resp;
  }

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
    if (!track) throw new CustomNotFoundException('Track');
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new CustomNotFoundException('Track');

    Object.keys(updateTrackDto).forEach((key) => {
      track[key] = updateTrackDto[key];
    });
    const data = await track.save();

    return data;
  }

  async remove(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new CustomNotFoundException('Track');
    await track.remove();
  }
}
