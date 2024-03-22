import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavsDatabaseService } from 'src/database/favs-database.service';
import { TrackDatabaseService } from 'src/database/track-database.service';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
    private trackDatabase: TrackDatabaseService,
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

  updateTrackByArtistId(artistId: string) {
    const allTracks = this.trackDatabase.findAll();
    const artistWithTracks = allTracks.filter(
      (track) => track.artistId === artistId,
    );
    artistWithTracks.forEach((track) => {
      this.trackDatabase.update(track.id, { artistId: null });
    });
  }

  updateTrackByAlbumId(albumId: string) {
    const allTracks = this.trackDatabase.findAll();
    const albumWithTracks = allTracks.filter(
      (track) => track.albumId === albumId,
    );
    albumWithTracks.forEach((track) => {
      this.trackDatabase.update(track.id, { albumId: null });
    });
  }
}
