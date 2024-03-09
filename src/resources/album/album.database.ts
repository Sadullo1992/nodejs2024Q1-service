import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IAlbum } from './album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumDatabase {
  private readonly albums: IAlbum[] = [];

  create(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(album);

    return album;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((item) => item.id === id);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) return;

    const updatedAlbum = {
      ...this.albums[index],
      ...updateAlbumDto,
    };
    this.albums[index] = updatedAlbum;

    return updatedAlbum;
  }

  remove(id: string) {
    const indexForDeletion = this.albums.findIndex((album) => album.id === id);
    if (indexForDeletion === -1) return false;

    this.albums.splice(indexForDeletion, 1);
    return true;
  }
}
