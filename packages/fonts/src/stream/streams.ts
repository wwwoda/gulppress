import { existsSync } from 'fs';
import { Globs, dest, src } from 'gulp';
import filter from 'gulp-filter';
import type { Transform } from 'stream';
import type File from 'vinyl';

export const createTtfToExtStream = (
  srcGlobs: Globs,
  plugin: (...args: any) => Transform,
  extName: string,
): NodeJS.ReadWriteStream => src(srcGlobs, { allowEmpty: true, base: './' })
  .pipe(filter(createTtfFilter(extName)))
  .pipe(plugin())
  .pipe(dest('./'));

const createTtfFilter = (extName: string) => (file: File): boolean => {
  if (!/ttf$/.test(file.path)) {
    return false;
  }
  return !existsSync(file.path.replace(/ttf$/, extName));
};
