import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser, UserNoPassword } from './user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserDatabase {
  private readonly users: IUser[] = [
    {
      id: 'd39117cd-e966-40ef-ae15-37ee87eb84be',
      login: 'Sadullo',
      password: '13245',
      version: 1,
      createdAt: 1709915850632,
      updatedAt: 1709915850632,
    },
  ];

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

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
