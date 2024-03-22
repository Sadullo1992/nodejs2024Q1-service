import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class Track extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

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
