import { Injectable, ConsoleLogger, LogLevel } from '@nestjs/common';
import { writeMessageToFile } from 'src/helpers/writeMessageToFile';
@Injectable()
export class LogService extends ConsoleLogger {
  async log(message?: string, context?: string) {
    if (!this.isLevelEnabled('log')) {
      return;
    }
    const formattedMessage = this.formattingMessage('log', message);
    await writeMessageToFile('log', formattedMessage);
    super.log(message, context);
  }

  async error(message?: string, context?: string) {
    if (!this.isLevelEnabled('error')) {
      return;
    }
    const formattedMessage = this.formattingMessage('error', message);
    await writeMessageToFile('error', formattedMessage);
    super.error(message, '', context);
  }

  async warn(message?: string, context?: string) {
    if (!this.isLevelEnabled('warn')) {
      return;
    }
    const formattedMessage = this.formattingMessage('warn', message);
    await writeMessageToFile('warn', formattedMessage);
    super.warn(message, context);
  }

  async debug(message?: string, context?: string) {
    if (!this.isLevelEnabled('debug')) {
      return;
    }
    const formattedMessage = this.formattingMessage('debug', message);
    await writeMessageToFile('debug', formattedMessage);
    super.debug(message, context);
  }

  async verbose(message?: string, context?: string) {
    if (!this.isLevelEnabled('verbose')) {
      return;
    }
    const formattedMessage = this.formattingMessage('verbose', message);
    await writeMessageToFile('verbose', formattedMessage);
    super.verbose(message, context);
  }

  formattingMessage(logLevel: LogLevel, message: string) {
    const pidMessage = this.formatPid(process.pid);
    return `${pidMessage}${this.getTimestamp()}     ${logLevel.toUpperCase()} ${message}\n`;
  }
}
