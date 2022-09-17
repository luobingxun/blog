import { promises } from 'fs';
import path from 'path';

export const getHomeDescription = async () => {
  return JSON.parse((await promises.readFile(path.resolve(process.cwd(), 'docs/homeDescriptions.json'))).toString());
};
