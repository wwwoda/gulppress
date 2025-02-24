import {
  Globs,
  src,
} from 'gulp';
import { SrcOptions } from 'vinyl-fs';

export const createStream = (
  input: Globs | NodeJS.ReadWriteStream,
  options?: SrcOptions,
): NodeJS.ReadWriteStream => {
  if (typeof input === 'string' || Array.isArray(input)) {
    return src(input, options);
  }
  return input;
};
