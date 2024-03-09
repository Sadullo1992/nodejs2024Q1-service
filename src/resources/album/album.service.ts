import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { uuidValidateV4 } from 'src/helpers/uuidValidateV4';
import { TrackService } from '../track/track.service';
import { AlbumDatabase } from './album.database';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('AlbumDatabase') private albumDatabase: AlbumDatabase,
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
    } else {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
