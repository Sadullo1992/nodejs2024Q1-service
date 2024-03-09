import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { uuidValidateV4 } from 'src/helpers/uuidValidateV4';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { UpdateFavDto } from './dto/update-fav.dto';
import { FavsDatabase } from './favs.database';

@Injectable()
export class FavsService {
  constructor(
    @Inject('FavsDatabase') private favsDatabase: FavsDatabase,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

  findAll() {
    const allFavsIds = this.favsDatabase.getAllFavs();

    const allArtists = this.artistService.findAll();
    const artists = allArtists.filter((artist) =>
      allFavsIds.artists.some((artistId) => artistId === artist.id),
    );

    const allAlbums = this.albumService.findAll();
    const albums = allAlbums.filter((album) =>
      allFavsIds.albums.some((albumId) => albumId === album.id),
    );

    const allTracks = this.trackService.findAll();
    const tracks = allTracks.filter((track) =>
      allFavsIds.tracks.some((trackId) => trackId === track.id),
    );

    return { artists, albums, tracks };
  }

  addTrack(id: string) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Track ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const allTracks = this.trackService.findAll();
    const track = allTracks.find((track) => track.id === id);
    if (!track)
      throw new HttpException(
        'Track ID not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    // add track id to db
    this.favsDatabase.addTrackId(id);
    return track;
  }

  removeTrack(id: string) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Track ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const isDeleted = this.favsDatabase.removeTrackId(id);
    if (!isDeleted)
      throw new HttpException('Track is not favorite', HttpStatus.NOT_FOUND);
  }

  addAlbum(id: string) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Album ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const allAlbums = this.albumService.findAll();
    const album = allAlbums.find((album) => album.id === id);
    if (!album)
      throw new HttpException(
        'Album ID not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    // add album id to db
    this.favsDatabase.addAlbumId(id);
    return album;
  }

  removeAlbum(id: string) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Album ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const isDeleted = this.favsDatabase.removeAlbumId(id);
    if (!isDeleted)
      throw new HttpException('Album is not favorite', HttpStatus.NOT_FOUND);
  }

  addArtist(id: string) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Artist ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const allArtists = this.artistService.findAll();
    const artist = allArtists.find((artist) => artist.id === id);
    if (!artist)
      throw new HttpException(
        'Artist ID not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    // add artist id to db
    this.favsDatabase.addArtistId(id);
    return artist;
  }

  removeArtist(id: string) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Artist ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const isDeleted = this.favsDatabase.removeArtistId(id);
    if (!isDeleted)
      throw new HttpException('Artist is not favorite', HttpStatus.NOT_FOUND);
  }
}
