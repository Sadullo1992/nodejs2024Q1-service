import { Album } from 'src/resources/album/entities/album.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('fav_album')
export class FavAlbum extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Album, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'albumId' })
  favAlbum: Album;
}
