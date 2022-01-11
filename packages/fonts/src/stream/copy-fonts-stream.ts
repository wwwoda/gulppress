import { Globs, dest, src } from 'gulp';
import changed from 'gulp-changed';
import filter from 'gulp-filter';

export const createCopyFontsStream = (
  srcGlobs: Globs,
  destFolder: string,
): NodeJS.ReadWriteStream => src(srcGlobs, { allowEmpty: true })
  .pipe(filter((file) => /(woff|woff2)$/.test(file.path)))
  .pipe(changed(destFolder))
  .pipe(dest(destFolder));
