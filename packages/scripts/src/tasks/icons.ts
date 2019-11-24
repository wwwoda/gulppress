import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
import cache from 'gulp-cache';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import gulpress from '../interfaces';

export default function (config: gulpress.IconsConfig): TaskFunction {
  function processIcons(): NodeJS.ReadWriteStream {
    return src(config.src)
      .pipe(
        cache(
          imagemin([
            imagemin.svgo({
              plugins: [
                {
                  removeViewBox: false,
                },
                {
                  cleanupIDs: false,
                },
              ],
            }),
          ]),
        ),
      )
      .pipe(changed(config.dest))
      .pipe(dest(config.dest))
      .pipe(gulpif(!!config.destPhpPartials, rename({
        extname: '.php',
      })))
      .pipe(gulpif(!!config.destPhpPartials, changed(config.destPhpPartials || config.dest)))
      .pipe(gulpif(!!config.destPhpPartials, dest(config.destPhpPartials || config.dest)));
  }

  return parallel(processIcons);
}
