import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() signupDto: CreateUserDto) {
    return this.userService.create(signupDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto);
  }
}
