import path from 'path';
import type { BufferFile } from 'vinyl';
import type { ImageFormat, SharpConfig } from './types';

export const getFormat = (file: BufferFile): ImageFormat | 'unsupported' => {
  const extname = path.extname(file.path);
  switch (extname) {
    case '.jpeg':
      return 'jpeg';
    case '.png':
      return 'png';
    case '.webp':
      return 'webp';
    case '.gif':
      return 'gif';
    case '.avif':
      return 'avif';
    case '.heif':
      return 'heif';
    case '.tiff':
      return 'tiff';
    case '.raw':
      return 'raw';
    default:
      return 'unsupported';
  }
};

export const getFormatsFromConfig = (file: BufferFile, config: SharpConfig): ImageFormat[] => {
  const toFormat = config.format || getFormat(file);
  if (toFormat === 'unsupported') {
    return [];
  }
  return Array.isArray(toFormat)
    ? toFormat
    : [toFormat];
};
