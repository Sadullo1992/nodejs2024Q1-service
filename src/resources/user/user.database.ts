import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser, UserNoPassword } from './user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserDatabase {
  private readonly users: IUser[] = [];

  create(createUserDto: CreateUserDto): UserNoPassword | undefined {
    const hasUserLogin = this.users.some(
      ({ login }) => login === createUserDto.login,
    );
    if (hasUserLogin) return;

    const d = new Date();
    const now = d.getTime();

    const user = {
      ...createUserDto,
      id: uuidv4(),
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.users.push(user);

    return user;
  }

  findAll() {
    const users = this.users.map(
      ({ id, login, version, createdAt, updatedAt }) => ({
        id,
        login,
        version,
        createdAt,
        updatedAt,
      }),
    );
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
