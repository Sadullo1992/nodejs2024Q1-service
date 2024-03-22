import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavsDatabaseService } from 'src/database/favs-database.service';
import { Repository } from 'typeorm';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
    private trackService: TrackService,
    private albumService: AlbumService,
    private favsDatabase: FavsDatabaseService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const modelArtist = await this.artistRepository
      .create(createArtistDto)
      .save();
    return modelArtist;
  }

  async findAll() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);

    Object.keys(updateArtistDto).forEach((key) => {
      artist[key] = updateArtistDto[key];
    });
    const data = await artist.save();

    return data;
  }

  async remove(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    await artist.remove();

    // should update and remove artistId
    this.trackService.updateTrackByArtistId(id);
    this.albumService.updateAlbumByArtistId(id);
    this.favsDatabase.removeArtistId(id);
  }
}
