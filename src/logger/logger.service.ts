import { Injectable, ConsoleLogger, LogLevel } from '@nestjs/common';
import { writeMessageToFile } from 'src/helpers/writeMessageToFile';
@Injectable()
export class LogService extends ConsoleLogger {
  log(message?: string, context?: string) {
    if (!this.isLevelEnabled('log')) {
      return;
    }
    const formattedMessage = this.formattingMessage('log', message);
    console.log(formattedMessage);
    // writeMessageToFile(formattedMessage);
    super.log(message, context);
  }

  error(message?: string, context?: string) {
    if (!this.isLevelEnabled('error')) {
      return;
    }
    const formattedMessage = this.formattingMessage('error', message);
    console.log(formattedMessage);
    writeMessageToFile('error', formattedMessage);
    super.error(message, '', context);
  }

  warn(message?: string, context?: string) {
    if (!this.isLevelEnabled('warn')) {
      return;
    }
    const formattedMessage = this.formattingMessage('warn', message);
    console.log(formattedMessage);
    super.warn(message, context);
  }

  debug(message?: string, context?: string) {
    if (!this.isLevelEnabled('debug')) {
      return;
    }
    const formattedMessage = this.formattingMessage('debug', message);
    console.log(formattedMessage);
    super.debug(message, context);
  }

  verbose(message?: string, context?: string) {
    if (!this.isLevelEnabled('verbose')) {
      return;
    }
    const formattedMessage = this.formattingMessage('verbose', message);
    console.log(formattedMessage);
    super.verbose(message, context);
  }

  formattingMessage(logLevel: LogLevel, message: string) {
    const pidMessage = this.formatPid(process.pid);
    return `${pidMessage}${this.getTimestamp()}     ${logLevel.toUpperCase()} ${message}\n`;
  }
}
