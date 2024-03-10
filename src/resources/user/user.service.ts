import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDatabaseService } from 'src/database/user-database.service';
import { genHashPassword, isMatchPassword } from 'src/helpers/hashPassword';
import { uuidValidateV4 } from 'src/helpers/uuidValidateV4';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.tdo';
import { IUser, UserNoPassword } from './user.interface';

@Injectable()
export class UserService {
  constructor(private userDatabase: UserDatabaseService) {}

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
    return this.userNoPassword(modelUser);
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
    return this.userNoPassword(user);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'User ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const user = this.userDatabase.findOne(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isMatch = await isMatchPassword(oldPassword, user.password);
    if (!isMatch)
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);

    const hash = await genHashPassword(newPassword);
    const updatedUser = this.userDatabase.update(id, hash);
    return this.userNoPassword(updatedUser);
  }

  remove(id: string) {
    const isUUID = uuidValidateV4(id);
    if (!isUUID)
      throw new HttpException(
        'User ID is invalid (not uuidv4)',
        HttpStatus.BAD_REQUEST,
      );

    const isDeleted = this.userDatabase.remove(id);
    if (!isDeleted) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  private userNoPassword(user: IUser): UserNoPassword {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
