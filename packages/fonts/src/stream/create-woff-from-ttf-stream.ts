import { existsSync } from 'fs';
import { Globs, dest, src } from 'gulp';
import filter from 'gulp-filter';
import ttf2woff from 'gulp-ttf2woff';
import type File from 'vinyl';

export const createWoffFromTtfStream = (
  srcGlobs: Globs,
): NodeJS.ReadWriteStream => src(srcGlobs, { allowEmpty: true, base: './' })
  .pipe(filter(fontFilter))
  .pipe(ttf2woff())
  .pipe(dest('./', { overwrite: false }));

const fontFilter = (file: File): boolean => {
  if (!/ttf$/.test(file.path)) {
    return false;
  }
  return !existsSync(file.path.replace(/ttf$/, 'woff'));
};
