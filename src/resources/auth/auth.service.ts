import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { isMatchPassword } from 'src/helpers/hashPassword';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      select: ['id', 'password'],
      where: { login: loginUserDto.login },
    });
    console.log(user);
    if (!user) throw new HttpException('User not found.', HttpStatus.FORBIDDEN);

    const isMatch = await isMatchPassword(loginUserDto.password, user.password);
    if (!isMatch)
      throw new HttpException('User not found.', HttpStatus.FORBIDDEN);

    const accessToken = await this.jwtService.signAsync({
      userId: user.id,
      login: loginUserDto.login,
    });

    return { accessToken };
  }
}
