import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Album } from 'src/resources/album/entities/album.entity';
import { Track } from 'src/resources/track/entities/track.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artist')
export class Artist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsBoolean()
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  tracks!: Track[];

  @OneToMany(() => Album, (album) => album.artist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  albums!: Album[];
}
