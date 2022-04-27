import { createStream } from '@gulppress/utils';
import { Globs, dest } from 'gulp';
import changed from 'gulp-changed';
import filter from 'gulp-filter';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';

export const createGenerateSvgPhpPartialStream = (
  input: Globs | NodeJS.ReadWriteStream,
  destFolder: string,
  disableGulpChanged?: boolean,
): NodeJS.ReadWriteStream => createStream(input, {
  silent: true,
})
  .pipe(filter('**/*.svg'))
  .pipe(rename({
    extname: '.php',
  }))
  .pipe(gulpif(disableGulpChanged !== true, changed(destFolder)))
  .pipe(dest(destFolder));
