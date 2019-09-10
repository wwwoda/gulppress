import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
import modernizr from 'gulp-modernizr';
import uglify from 'gulp-uglify';

interface ModernizrConfig {
  src: string | string[];
  dest: string;
  options: modernizr.Params;
}

export default function (config: ModernizrConfig): TaskFunction {
  function generateModernizr(): NodeJS.ReadWriteStream {
    return src(config.src)
      .pipe(modernizr(config.options))
      .pipe(uglify())
      .pipe(dest(config.dest));
  }

  return parallel(generateModernizr);
}
