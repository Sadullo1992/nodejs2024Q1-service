import { appendFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export const writeMessageToFile = (logLevel: string, message: string) => {
  const filePath = resolve(process.cwd(), './logs/error.log');
  appendFile(filePath, message);
};
