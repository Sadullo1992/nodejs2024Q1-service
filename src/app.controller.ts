import { Controller, Get } from '@nestjs/common';
import { Public } from './helpers/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  intro(): string {
    return 'REST Home Library service!';
  }
}
