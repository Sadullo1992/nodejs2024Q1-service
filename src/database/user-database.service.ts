import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/resources/user/dto/create-user.dto';
import { IUser } from 'src/resources/user/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserDatabaseService {
  private readonly users: IUser[] = [];

  create(createUserDto: CreateUserDto) {
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

  findOne(id: string) {
    const user = this.users.find((item) => item.id === id);
    return user;
  }

  update(id: string, newPassword: string) {
    const d = new Date();
    const now = d.getTime();

    const index = this.users.findIndex((user) => user.id === id);
    const user = this.users[index];
    user.password = newPassword;
    user.version += 1;
    user.updatedAt = now;
    return user;
  }

  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }
}
