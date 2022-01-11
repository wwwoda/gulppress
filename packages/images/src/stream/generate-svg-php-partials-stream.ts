import { createStream } from '@gulppress/utils';
import { Globs, dest } from 'gulp';
import changed from 'gulp-changed';
import filter from 'gulp-filter';
import rename from 'gulp-rename';

export const createGenerateSvgPhpPartialStream = (
  input: Globs | NodeJS.ReadWriteStream,
  destFolder: string,
): NodeJS.ReadWriteStream => createStream(input)
  .pipe(filter('**/*.svg'))
  .pipe(rename({
    extname: '.php',
  }))
  .pipe(changed(destFolder))
  .pipe(dest(destFolder));
