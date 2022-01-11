import { existsSync } from 'fs';
import { Globs, dest, src } from 'gulp';
import filter from 'gulp-filter';
import ttf2woff2 from 'gulp-ttf2woff2';
import type File from 'vinyl';

export const createWoff2FromTtfStream = (
  srcGlobs: Globs,
): NodeJS.ReadWriteStream => src(srcGlobs, { allowEmpty: true, base: './' })
  .pipe(filter(fontFilter))
  .pipe(ttf2woff2())
  .pipe(dest('./', { overwrite: false }));

const fontFilter = (file: File): boolean => {
  if (!/ttf$/.test(file.path)) {
    return false;
  }
  return !existsSync(file.path.replace(/ttf$/, 'woff2'));
};
