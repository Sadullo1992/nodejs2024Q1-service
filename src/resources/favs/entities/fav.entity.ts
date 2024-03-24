import { BaseEntity, Column, PrimaryColumn, Entity } from 'typeorm';

@Entity('favs')
export class Fav extends BaseEntity {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column('uuid', { array: true, default: [] })
  artists: string[];

  @Column('uuid', { array: true, default: [] })
  albums: string[];

  @Column('uuid', { array: true, default: [] })
  tracks: string[];
}
