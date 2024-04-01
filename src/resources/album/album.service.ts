import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomNotFoundException } from 'src/exceptions/custom-not-found.exception';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
  ) {}

  async isExist(id: string) {
    const resp = await this.albumRepository.findOne({ where: { id } });
    if (!resp) {
      throw new HttpException(
        'Album ID not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return !!resp;
  }

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
    if (!album) throw new CustomNotFoundException('Album');
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new CustomNotFoundException('Album');

    Object.keys(updateAlbumDto).forEach((key) => {
      album[key] = updateAlbumDto[key];
    });
    const data = await album.save();

    return data;
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new CustomNotFoundException('Album');
    await album.remove();
  }
}
