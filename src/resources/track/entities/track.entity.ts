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
  OneToOne,
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
  @OneToOne(() => Artist, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist!: string | null;

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  /** @public album uuid */
  @OneToOne(() => Album, {
    onDelete: 'SET NULL',
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
