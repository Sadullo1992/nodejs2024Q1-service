import { PickType } from '@nestjs/mapped-types';
import { Artist } from '../entities/artist.entity';

export class CreateArtistDto extends PickType(Artist, [
  'name',
  'grammy',
] as const) {}
