import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomNotFoundException } from 'src/exceptions/custom-not-found.exception';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}

  async isExist(id: string) {
    const resp = await this.artistRepository.findOne({ where: { id } });
    if (!resp) {
      throw new HttpException(
        'Artist ID not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return !!resp;
  }

  async create(createArtistDto: CreateArtistDto) {
    const modelArtist = await this.artistRepository
      .create(createArtistDto)
      .save();
    return modelArtist;
  }

  async findAll() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new CustomNotFoundException('Artist');
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new CustomNotFoundException('Artist');

    Object.keys(updateArtistDto).forEach((key) => {
      artist[key] = updateArtistDto[key];
    });
    const data = await artist.save();

    return data;
  }

  async remove(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new CustomNotFoundException('Artist');
    await artist.remove();
  }
}
