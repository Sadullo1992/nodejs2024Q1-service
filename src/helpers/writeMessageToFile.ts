import { appendFile, stat, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

let filePath: string;

export const writeMessageToFile = async (
  loggingLevel: string,
  message: string,
) => {
  const logLevel = loggingLevel === 'error' ? loggingLevel : 'info';

  if (!filePath) {
    filePath = await getFilePath(logLevel);
    await appendFile(filePath, '');
  }

  if (!!filePath && !filePath.includes(logLevel)) {
    filePath = await getFilePath(logLevel);
    await appendFile(filePath, '');
  }

  const { size } = await stat(filePath);
  if (size > 102400) {
    filePath = generateNewFilePath(logLevel);
    await appendFile(filePath, '');
  }

  await appendFile(filePath, message);
};

async function getFilePath(logLevel: string) {
  const files = await readdir(resolve(process.cwd(), './logs'));
  const fileDates = files
    .filter((item) => item.startsWith(`${logLevel}-`))
    .map((item) => +item.replace(/\D/g, ''));

  if (fileDates.length === 0) return generateNewFilePath(logLevel);
  const lastFileDate = Math.max(...fileDates);

  const { size } = await stat(generateFilePath(logLevel, lastFileDate));
  if (size > 102400) return generateNewFilePath(logLevel);

  return generateFilePath(logLevel, lastFileDate);
}

function generateNewFilePath(logLevel: string) {
  return generateFilePath(logLevel, Date.now());
}

function generateFilePath(logLevel: string, time: number) {
  return resolve(process.cwd(), `./logs/${logLevel}-${time}.log`);
}
