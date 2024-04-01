import { readFile } from 'fs/promises';
import { resolve } from 'path';

import * as yaml from 'js-yaml';

export const yamlFileLoader = async (pathToFile: string) => {
  const rootFolder = process.cwd();
  const filePath = resolve(rootFolder, pathToFile);

  const content = await readFile(filePath, {
    encoding: 'utf8',
  });

  return yaml.load(content);
};
