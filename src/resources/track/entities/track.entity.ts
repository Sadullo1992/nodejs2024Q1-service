import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { Album } from 'src/resources/album/entities/album.entity';
import { Artist } from 'src/resources/artist/entities/artist.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('track')
export class Track extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  /** @public artist uuid */
  @ManyToOne(() => Artist, (artist) => artist.tracks, {
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

  /** @public album uuid */
  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId' })
  album!: string | null;

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
