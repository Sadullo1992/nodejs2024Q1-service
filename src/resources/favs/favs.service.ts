import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavAlbum } from './entities/fav-album.entity';
import { FavArtist } from './entities/fav-artist.entity';
import { FavTrack } from './entities/fav-track.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavAlbum)
    private favAlbumRepository: Repository<FavAlbum>,
    @InjectRepository(FavArtist)
    private favArtistRepository: Repository<FavArtist>,
    @InjectRepository(FavTrack)
    private favTrackRepository: Repository<FavTrack>,
    private trackRepository: TrackService,
    private albumRepository: AlbumService,
    private artistRepository: ArtistService,
  ) {}

  async findAll() {
    const favAlbums = await this.favAlbumRepository.find({
      relations: {
        favAlbum: true,
      },
    });
    const albums = favAlbums.map((item) => item.favAlbum);

    const favArtists = await this.favArtistRepository.find({
      relations: {
        favArtist: true,
      },
    });
    const artists = favArtists.map((item) => item.favArtist);

    const favTracks = await this.favTrackRepository.find({
      relations: {
        favTrack: true,
      },
    });
    const tracks = favTracks.map((item) => item.favTrack);

    return { albums, artists, tracks };
  }

  async addTrack(id: string) {
    await this.trackRepository.isExist(id);

    const track = await this.favTrackRepository.save({ favTrack: { id } });
    return track.favTrack;
  }

  async removeTrack(id: string) {
    const track = await this.favTrackRepository.findOneBy({
      favTrack: { id },
    });
    if (!track)
      throw new HttpException('Track is not favorite', HttpStatus.NOT_FOUND);

    await track.remove();
  }

  async addAlbum(id: string) {
    await this.albumRepository.isExist(id);

    const album = await this.favAlbumRepository.save({ favAlbum: { id } });
    return album.favAlbum;
  }

  async removeAlbum(id: string) {
    const album = await this.favAlbumRepository.findOneBy({
      favAlbum: { id },
    });
    if (!album)
      throw new HttpException('Album is not favorite', HttpStatus.NOT_FOUND);

    await album.remove();
  }

  async addArtist(id: string) {
    await this.artistRepository.isExist(id);

    const artist = await this.favArtistRepository.save({ favArtist: { id } });
    return artist.favArtist;
  }

  async removeArtist(id: string) {
    const artist = await this.favArtistRepository.findOneBy({
      favArtist: { id },
    });
    if (!artist)
      throw new HttpException('Artist is not favorite', HttpStatus.NOT_FOUND);

    await artist.remove();
  }
}
