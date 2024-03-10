import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IArtist } from 'src/resources/artist/artist.interface';
import { CreateArtistDto } from 'src/resources/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/resources/artist/dto/update-artist.dto';

@Injectable()
export class ArtistDatabaseService {
  private readonly artists: IArtist[] = [];

  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists.push(artist);

    return artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find((item) => item.id === id);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index === -1) return;

    const updatedArtist = {
      ...this.artists[index],
      ...updateArtistDto,
    };
    this.artists[index] = updatedArtist;

    return updatedArtist;
  }

  remove(id: string) {
    const indexForDeletion = this.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (indexForDeletion === -1) return false;

    this.artists.splice(indexForDeletion, 1);
    return true;
  }
}
