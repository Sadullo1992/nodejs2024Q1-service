import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  login: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Column({
    type: 'integer',
    default: 1,
  })
  @IsNumber()
  version: number;

  @Column({ type: 'bigint' })
  createdAt: number;

  @Column({ type: 'bigint' })
  updatedAt: number;
}
