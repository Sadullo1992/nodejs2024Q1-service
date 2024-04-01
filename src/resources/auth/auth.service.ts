import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { isMatchPassword } from 'src/helpers/hashPassword';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      select: ['id', 'password'],
      where: { login: loginUserDto.login },
    });
    if (!user) throw new HttpException('User not found.', HttpStatus.FORBIDDEN);

    const isMatch = await isMatchPassword(loginUserDto.password, user.password);
    if (!isMatch)
      throw new HttpException('User not found.', HttpStatus.FORBIDDEN);

    const accessToken = await this.jwtService.signAsync({
      userId: user.id,
      login: loginUserDto.login,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        userId: user.id,
        login: loginUserDto.login,
      },
      { expiresIn: '60s' },
    );

    return { accessToken, refreshToken };
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    const isValidDto = 'refreshToken' in refreshTokenDto;
    if (!isValidDto)
      throw new HttpException(
        'refreshToken is not exist in body',
        HttpStatus.UNAUTHORIZED,
      );

    const { refreshToken } = refreshTokenDto;

    try {
      const secret = this.configService.get<string>('JWT_SECRET_KEY');
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret,
      });

      const accessToken = await this.jwtService.signAsync({
        userId: payload.userId,
        login: payload.login,
      });

      return { accessToken, refreshToken };
    } catch (err) {
      throw new HttpException(
        'Refresh token is invalid or expired',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
