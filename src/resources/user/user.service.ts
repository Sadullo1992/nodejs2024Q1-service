import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomNotFoundException } from 'src/exceptions/custom-not-found.exception';
import { genHashPassword, isMatchPassword } from 'src/helpers/hashPassword';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.tdo';
import { User, IUser } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { login, password: password } = createUserDto;
    const hash = await genHashPassword(password);
    const now = Date.now();

    const modelUser = await this.userRepository
      .create({ login, password: hash, createdAt: now, updatedAt: now })
      .save();

    return this.transformUserData(modelUser);
  }

  async getAll() {
    const users = await this.userRepository.find({
      select: ['id', 'login', 'version', 'createdAt', 'updatedAt'],
    });
    const resp = users.map((user) => this.transformUserData(user));
    return resp;
  }

  async getById(id: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'login', 'version', 'createdAt', 'updatedAt'],
      where: { id },
    });

    if (!user) throw new CustomNotFoundException('User');

    return this.transformUserData(user);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new CustomNotFoundException('User');

    const isMatch = await isMatchPassword(oldPassword, user.password);
    if (!isMatch)
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);

    const hash = await genHashPassword(newPassword);

    const now = Date.now();

    user.password = hash;
    user.version++;
    user.updatedAt = now;
    const updatedUser = await user.save();

    return this.transformUserData(updatedUser);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new CustomNotFoundException('User');
    }
    await user.remove();
  }

  private transformUserData = (user: Partial<IUser>) => ({
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: +user.createdAt,
    updatedAt: +user.updatedAt,
  });
}
