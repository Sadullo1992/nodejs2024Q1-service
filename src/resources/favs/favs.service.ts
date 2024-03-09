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

  findOne(id: string) {
    return `This action returns a #${id} fav`;
  }

  update(id: string, updateFavDto: UpdateFavDto) {
    return `This action updates a #${id} fav`;
  }

  remove(id: string) {
    return `This action removes a #${id} fav`;
  }
}
