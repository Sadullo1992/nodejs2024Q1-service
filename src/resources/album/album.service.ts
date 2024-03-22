import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumDatabaseService } from 'src/database/album-database.service';
import { FavsDatabaseService } from 'src/database/favs-database.service';
import { Repository } from 'typeorm';
import { TrackService } from '../track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
    private albumDatabase: AlbumDatabaseService,
    private favsDatabase: FavsDatabaseService,
    private trackService: TrackService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const modelAlbum = await this.albumRepository.create(createAlbumDto).save();
    return modelAlbum;
  }

  async findAll() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);

    Object.keys(updateAlbumDto).forEach((key) => {
      album[key] = updateAlbumDto[key];
    });
    const data = await album.save();

    return data;
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    await album.remove();

    // should update and remove by albumId
    this.trackService.updateTrackByAlbumId(id);
    this.favsDatabase.removeAlbumId(id);
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
