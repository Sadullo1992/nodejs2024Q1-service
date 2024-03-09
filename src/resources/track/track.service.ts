import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { uuidValidateV4 } from 'src/helpers/uuidValidateV4';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackDatabase } from './track.database';

@Injectable()
export class TrackService {
  constructor(@Inject('TrackDatabase') private trackDatabase: TrackDatabase) {}

  create(createTrackDto: CreateTrackDto) {
    return this.trackDatabase.create(createTrackDto);
  }

  findAll() {
    return this.trackDatabase.findAll();
  }

  findOne(id: string) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Track ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const track = this.trackDatabase.findOne(id);
    if (!track)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Track ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const updatedTrack = this.trackDatabase.update(id, updateTrackDto);
    if (!updatedTrack)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);

    return updatedTrack;
  }

  remove(id: string) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'Track ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const isDeleted = this.trackDatabase.remove(id);
    if (!isDeleted) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
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
