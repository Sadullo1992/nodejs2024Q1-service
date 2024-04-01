import { appendFile, stat, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

export const writeMessageToFile = async (
  loggingLevel: string,
  message: string,
  maxFileSize: string,
) => {
  const logLevel = loggingLevel === 'error' ? loggingLevel : 'info';
  const maxSize = +maxFileSize * 1024;

  try {
    const filePath = await getFilePath(logLevel, maxSize);
    await appendFile(filePath, message);
  } catch (err) {
    console.log(err);
  }
};

async function getFilePath(logLevel: string, maxSize: number) {
  const files = await readdir(resolve(process.cwd(), './logs'));
  const fileDates = files
    .filter((item) => item.startsWith(`${logLevel}-`))
    .map((item) => +item.replace(/\D/g, ''));

  if (fileDates.length === 0) return generateNewFilePath(logLevel);
  const lastFileDate = Math.max(...fileDates);

  const { size } = await stat(generateFilePath(logLevel, lastFileDate));
  if (size > maxSize) return generateNewFilePath(logLevel);

  return generateFilePath(logLevel, lastFileDate);
}

function generateNewFilePath(logLevel: string) {
  return generateFilePath(logLevel, Date.now());
}

function generateFilePath(logLevel: string, time: number) {
  return resolve(process.cwd(), `./logs/${logLevel}-${time}.log`);
}
