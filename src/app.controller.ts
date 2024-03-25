import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  intro(): string {
    return 'REST Home Library service!';
  }
}
