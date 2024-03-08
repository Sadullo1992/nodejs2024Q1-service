import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { genHashPassword } from 'src/helpers/genHashPassword';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDatabase } from './user.database';

@Injectable()
export class UserService {
  constructor(@Inject('UserDatabase') private userDatabase: UserDatabase) {}

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const hash = await genHashPassword(password);

    const modelUser = this.userDatabase.create({ login, password: hash });
    if (!modelUser) {
      throw new HttpException(
        'User login already exists!',
        HttpStatus.CONFLICT,
      );
    }

    return {
      id: modelUser.id,
      login: modelUser.login,
      version: modelUser.version,
      createdAt: modelUser.createdAt,
      updatedAt: modelUser.updatedAt,
    };
  }

  findAll() {
    return this.userDatabase.findAll();
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
