import { Injectable, ConsoleLogger, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { writeMessageToFile } from 'src/helpers/writeMessageToFile';

const LOG_LEVELS = ['error', 'warn', 'log', 'debug', 'verbose'];

@Injectable()
export class LogService extends ConsoleLogger {
  maxFileSize?: string;
  level?: string;
  logLevels: string[];
  constructor(private configService: ConfigService) {
    super();
    this.maxFileSize = this.configService.get<string>('MAX_FILE_SIZE');
    this.level = this.configService.get<string>('LOG_LEVEL');
    this.logLevels = LOG_LEVELS.slice(0, +this.level + 1);
  }

  async log(message?: string, context?: string) {
    if (this.logLevels.includes('log')) {
      const formattedMessage = this.formattingMessage('log', message);
      await writeMessageToFile('log', formattedMessage, this.maxFileSize);
      super.log(message, context);
    }
  }

  async error(message?: string, context?: string) {
    if (this.logLevels.includes('error')) {
      const formattedMessage = this.formattingMessage('error', message);
      await writeMessageToFile('error', formattedMessage, this.maxFileSize);
      super.error(message, '', context);
    }
  }

  async warn(message?: string, context?: string) {
    if (this.logLevels.includes('warn')) {
      const formattedMessage = this.formattingMessage('warn', message);
      await writeMessageToFile('warn', formattedMessage, this.maxFileSize);
      super.warn(message, context);
    }
  }

  async debug(message?: string, context?: string) {
    if (this.logLevels.includes('debug')) {
      const formattedMessage = this.formattingMessage('debug', message);
      await writeMessageToFile('debug', formattedMessage, this.maxFileSize);
      super.debug(message, context);
    }
  }

  async verbose(message?: string, context?: string) {
    if (this.logLevels.includes('verbose')) {
      const formattedMessage = this.formattingMessage('verbose', message);
      await writeMessageToFile('verbose', formattedMessage, this.maxFileSize);
      super.verbose(message, context);
    }
  }

  formattingMessage(logLevel: LogLevel, message: string) {
    const pidMessage = this.formatPid(process.pid);
    return `${pidMessage}${this.getTimestamp()}     ${logLevel.toUpperCase()} ${message}\n`;
  }
}
