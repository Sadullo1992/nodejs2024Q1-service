import { Injectable } from '@nestjs/common';

@Injectable()
export class FavsDatabase {
  private readonly artists: string[] = [];
  private readonly albums: string[] = [];
  private readonly tracks: string[] = [];

  addTrackId(id: string) {
    this.tracks.push(id);
  }

  getAllFavs() {
    return { artists: this.artists, albums: this.albums, tracks: this.tracks };
  }

  remove(id: string) {
    return true;
  }
}
