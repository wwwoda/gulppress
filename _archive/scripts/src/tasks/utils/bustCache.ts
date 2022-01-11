import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';

const gulpBuster = require('gulp-buster');

export function bustCacheTask(
  srcGlobs: Globs,
  destFolder: string,
  fileName: string = '.assets.json',
): TaskFunction {
  return () => (bustCacheStream(srcGlobs, destFolder, fileName));
}

export function bustCacheStream(
  srcGlobs: Globs,
  destFolder: string,
  fileName: string = '.assets.json',
): NodeJS.ReadWriteStream {
  return src(srcGlobs)
    .pipe(
      gulpBuster({
        fileName,
        relativePath: destFolder,
      }),
    )
    .pipe(dest(destFolder));
}
