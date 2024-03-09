import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { uuidValidateV4 } from 'src/helpers/uuidValidateV4';
import { TrackService } from '../track/track.service';
import { ArtistDatabase } from './artist.database';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ArtistDatabase') private artistDatabase: ArtistDatabase,
    private trackService: TrackService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    return this.artistDatabase.create(createArtistDto);
  }

  findAll() {
    return this.artistDatabase.findAll();
  }

  findOne(id: string) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Artist ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const artist = this.artistDatabase.findOne(id);
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Artist ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const updatedArtist = this.artistDatabase.update(id, updateArtistDto);
    if (!updatedArtist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);

    return updatedArtist;
  }

  remove(id: string) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Artist ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const isDeleted = this.artistDatabase.remove(id);
    if (isDeleted) {
      this.trackService.updateTrackByArtistId(id);
    } else {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
