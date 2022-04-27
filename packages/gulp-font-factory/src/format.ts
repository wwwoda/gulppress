import path from 'path';
import type { BufferFile } from 'vinyl';
import type { FontFormatRead, FontFormatWrite } from '.';
import type { FontConfig } from './types';

export const getFileFormat = (file: BufferFile): FontFormatRead | null => {
  switch (path.extname(file.path)) {
    case '.ttf':
      return 'ttf';
    case '.woff':
      return 'woff';
    case '.woff2':
      return 'woff2';
    case '.eot':
      return 'eot';
    case '.svg':
      return 'svg';
    case '.otf':
      return 'otf';
    default:
      return null;
  }
};

export const getWriteFormats = (file: BufferFile, config: FontConfig): FontFormatWrite[] => {
  const toFormat = config.format || getFileFormat(file);
  if (
    toFormat === null
    || toFormat === 'otf'
    || toFormat === 'eot'
    || toFormat === 'svg'
  ) {
    return [];
  }
  return Array.isArray(toFormat)
    ? [...new Set(toFormat)]
    : [toFormat];
};
