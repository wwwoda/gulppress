import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';

const gulpBuster = require('gulp-buster');

export function bustCacheTask(
  globs: Globs,
  folder: string,
  fileName: string = '.assets.json',
): TaskFunction {
  return () => (bustCacheStream(globs, folder, fileName));
}

export function bustCacheStream(
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
