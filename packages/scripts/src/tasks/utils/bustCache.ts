import {
  dest,
  Globs,
  src,
  TaskFunction,
} from 'gulp';

const gulpBuster = require('gulp-buster');

export function getBustCacheTask(
  globs: Globs,
  folder: string,
  fileName: string = '.assets.json',
): TaskFunction {
  return () => (getBustCacheStream(globs, folder, fileName));
}

export function getBustCacheStream(
  globs: Globs,
  folder: string,
  fileName: string = '.assets.json',
): NodeJS.ReadWriteStream {
  return src(globs)
    .pipe(
      gulpBuster({
        fileName,
        relativePath: folder,
      }),
    )
    .pipe(dest(folder));
}
