import { HttpStatus, HttpException } from '@nestjs/common';

export class CustomNotFoundException extends HttpException {
  constructor(source: string) {
    super(`${source} not found`, HttpStatus.NOT_FOUND);
  }
}
