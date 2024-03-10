import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumDatabaseService } from 'src/database/album-database.service';
import { ArtistDatabaseService } from 'src/database/artist-database.service';
import { FavsDatabaseService } from 'src/database/favs-database.service';
import { TrackDatabaseService } from 'src/database/track-database.service';
import { uuidValidateV4 } from 'src/helpers/uuidValidateV4';

@Injectable()
export class FavsService {
  constructor(
    private favsDatabase: FavsDatabaseService,
    private artistDatabase: ArtistDatabaseService,
    private albumDatabase: AlbumDatabaseService,
    private trackDatabase: TrackDatabaseService,
  ) {}

  findAll() {
    const allFavsIds = this.favsDatabase.getAllFavs();

    const allArtists = this.artistDatabase.findAll();
    const artists = allArtists.filter((artist) =>
      allFavsIds.artists.some((artistId) => artistId === artist.id),
    );

    const allAlbums = this.albumDatabase.findAll();
    const albums = allAlbums.filter((album) =>
      allFavsIds.albums.some((albumId) => albumId === album.id),
    );

    const allTracks = this.trackDatabase.findAll();
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

    const track = this.trackDatabase.findOne(id);
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

    const album = this.albumDatabase.findOne(id);
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

    const artist = this.artistDatabase.findOne(id);
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
