import { Injectable } from '@nestjs/common';

@Injectable()
export class FavsDatabaseService {
  private readonly artists: string[] = [];
  private readonly albums: string[] = [];
  private readonly tracks: string[] = [];

  getAllFavs() {
    return { artists: this.artists, albums: this.albums, tracks: this.tracks };
  }

  addTrackId(id: string) {
    this.tracks.push(id);
  }

  removeTrackId(id: string) {
    const indexForDeletion = this.tracks.findIndex((trackId) => trackId === id);
    if (indexForDeletion === -1) return false;

    this.tracks.splice(indexForDeletion, 1);
    return true;
  }

  addAlbumId(id: string) {
    this.albums.push(id);
  }

  removeAlbumId(id: string) {
    const indexForDeletion = this.albums.findIndex((albumId) => albumId === id);
    if (indexForDeletion === -1) return false;

    this.albums.splice(indexForDeletion, 1);
    return true;
  }

  addArtistId(id: string) {
    this.artists.push(id);
  }

  removeArtistId(id: string) {
    const indexForDeletion = this.artists.findIndex(
      (artistId) => artistId === id,
    );
    if (indexForDeletion === -1) return false;

    this.artists.splice(indexForDeletion, 1);
    return true;
  }
}
