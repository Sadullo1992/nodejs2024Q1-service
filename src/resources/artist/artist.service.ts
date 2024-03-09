import { Inject, Injectable } from '@nestjs/common';
import { ArtistDatabase } from './artist.database';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ArtistDatabase') private artistDatabase: ArtistDatabase,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    return this.artistDatabase.create(createArtistDto);
  }

  findAll() {
    return this.artistDatabase.findAll();
  }

  findOne(id: string) {
    return `This action returns a #${id} artist`;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: string) {
    return `This action removes a #${id} artist`;
  }
}
