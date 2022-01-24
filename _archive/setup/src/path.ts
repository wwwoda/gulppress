import path from 'path';

export const getRootPath = (): string => {
  if (process.env.NODE_ENV === 'test') {
    return path.resolve(__dirname, '../');
  }
  return process.cwd();
};

export const setRootPath = (newRootPath: string): void => {
  rootPath = newRootPath;
};

export const root = (append = ''): string => path.resolve(rootPath, append);

let rootPath = getRootPath();
