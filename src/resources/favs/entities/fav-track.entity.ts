import { Track } from 'src/resources/track/entities/track.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('fav_track')
export class FavTrack extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Track, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trackId' })
  favTrack: Track;
}
