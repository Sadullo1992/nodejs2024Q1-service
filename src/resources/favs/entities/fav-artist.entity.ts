import { Artist } from 'src/resources/artist/entities/artist.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('fav_artist')
export class FavArtist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Artist, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artistId' })
  favArtist: Artist;
}
