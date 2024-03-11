import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumDatabaseService } from 'src/database/album-database.service';
import { FavsDatabaseService } from 'src/database/favs-database.service';
import { uuidValidateV4 } from 'src/helpers/uuidValidateV4';
import { TrackService } from '../track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private albumDatabase: AlbumDatabaseService,
    private favsDatabase: FavsDatabaseService,
    private trackService: TrackService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumDatabase.create(createAlbumDto);
  }

  findAll() {
    return this.albumDatabase.findAll();
  }

  findOne(id: string) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Album ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const album = this.albumDatabase.findOne(id);
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Album ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const updatedAlbum = this.albumDatabase.update(id, updateAlbumDto);
    if (!updatedAlbum)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);

    return updatedAlbum;
  }

  remove(id: string) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Album ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const isDeleted = this.albumDatabase.remove(id);
    if (isDeleted) {
      this.trackService.updateTrackByAlbumId(id);
      this.favsDatabase.removeAlbumId(id);
    } else {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }

  updateAlbumByArtistId(artistId: string) {
    const allAlbums = this.albumDatabase.findAll();
    const albumWithTracks = allAlbums.filter(
      (album) => album.artistId === artistId,
    );
    albumWithTracks.forEach((track) => {
      this.albumDatabase.update(track.id, { artistId: null });
    });
  }
}
