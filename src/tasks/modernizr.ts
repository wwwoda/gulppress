import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
import modernizr from 'gulp-modernizr';
import uglify from 'gulp-uglify';
import gulpress from '../interfaces';

export default function (config: gulpress.ModernizrConfig): TaskFunction {
  function generateModernizr(): NodeJS.ReadWriteStream {
    return src(config.src)
      .pipe(modernizr(config.modernizrOptions))
      .pipe(uglify())
      .pipe(dest(config.dest));
  }

  return parallel(generateModernizr);
}
