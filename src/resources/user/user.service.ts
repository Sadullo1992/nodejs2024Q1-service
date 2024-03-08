import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { genHashPassword } from 'src/helpers/genHashPassword';
import { uuidValidateV4 } from 'src/helpers/uuidValidateV4';
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

  getAll() {
    return this.userDatabase.findAll();
  }

  getById(id: string) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'User ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const user = this.userDatabase.findOne(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
