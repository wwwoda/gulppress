import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
import cache from 'gulp-cache';
import changed from 'gulp-changed';
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
      .pipe(
        rename({
          extname: '.php',
        }),
      )
      .pipe(changed(config.dest))
      .pipe(dest(config.dest));
  }

  return parallel(processIcons);
}
