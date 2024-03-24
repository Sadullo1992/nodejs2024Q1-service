import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Repository } from 'typeorm';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { Fav } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Fav) private favsRepository: Repository<Fav>,
    private trackRepository: TrackService,
    private albumRepository: AlbumService,
    private artistRepository: ArtistService,
  ) {
    this.favsRepository.create({ id: 'favs' }).save();
  }

  async findAll() {
    const allFavsIds = await this.favsRepository.findOne({
      select: ['artists', 'albums', 'tracks'],
      where: { id: 'favs' },
    });

    const allArtists = await this.artistRepository.findAll();
    const artists = allArtists.filter((artist) =>
      allFavsIds.artists.some((artistId) => artistId === artist.id),
    );

    const allAlbums = await this.albumRepository.findAll();
    const albums = allAlbums.filter((album) =>
      allFavsIds.albums.some((albumId) => albumId === album.id),
    );

    const allTracks = await this.trackRepository.findAll();
    const tracks = allTracks.filter((track) =>
      allFavsIds.tracks.some((trackId) => trackId === track.id),
    );

    return { artists, albums, tracks };
  }

  async addTrack(id: string) {
    await this.trackRepository.isExist(id);
    await this.favsRepository.update(
      { id: 'favs' },
      {
        tracks: () => `array_append(tracks, '${id}')`,
      },
    );
    return id;
  }

  async removeTrack(id: string) {
    const favs = await this.favsRepository.findOneBy({
      tracks: ArrayContains([`${id}`]),
    });
    if (!favs)
      throw new HttpException('Track is not favorite', HttpStatus.NOT_FOUND);

    await this.favsRepository.update(
      { id: 'favs' },
      {
        tracks: () => `array_remove(tracks, '${id}')`,
      },
    );
  }

  async addAlbum(id: string) {
    await this.albumRepository.isExist(id);
    await this.favsRepository.update(
      { id: 'favs' },
      {
        albums: () => `array_append(albums, '${id}')`,
      },
    );
    return id;
  }

  async removeAlbum(id: string) {
    const favs = await this.favsRepository.findOneBy({
      albums: ArrayContains([`${id}`]),
    });
    if (!favs)
      throw new HttpException('Album is not favorite', HttpStatus.NOT_FOUND);

    await this.favsRepository.update(
      { id: 'favs' },
      {
        albums: () => `array_remove(albums, '${id}')`,
      },
    );
  }

  async addArtist(id: string) {
    await this.artistRepository.isExist(id);
    await this.favsRepository.update(
      { id: 'favs' },
      {
        artists: () => `array_append(artists, '${id}')`,
      },
    );
    return id;
  }

  async removeArtist(id: string) {
    const favs = await this.favsRepository.findOneBy({
      artists: ArrayContains([`${id}`]),
    });
    if (!favs)
      throw new HttpException('Artist is not favorite', HttpStatus.NOT_FOUND);

    await this.favsRepository.update(
      { id: 'favs' },
      {
        artists: () => `array_remove(artists, '${id}')`,
      },
    );
  }
}
