import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { Artist } from 'src/resources/artist/entities/artist.entity';
import { Track } from 'src/resources/track/entities/track.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album')
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  /** @public artist uuid */
  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'artistId' })
  artist!: string | null;

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @OneToMany(() => Track, (track) => track.album, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  tracks!: Track[];
}
