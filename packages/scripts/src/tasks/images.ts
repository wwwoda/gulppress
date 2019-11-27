import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
import cache from 'gulp-cache';
import changed from 'gulp-changed';
import filter from 'gulp-filter';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import gulpress from '../interfaces';

export default function (config: gulpress.ImagesConfig): TaskFunction {
  function processImages(): NodeJS.ReadWriteStream {
    return src(config.src)
      .pipe(
        cache(
          imagemin([
            imagemin.gifsicle({
              interlaced: true,
            }),
            imagemin.jpegtran({
              progressive: true,
            }),
            imagemin.optipng({
              optimizationLevel: 3,
            }),
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
      .on('error', function(e) { console.log(e); })
      .pipe(changed(config.dest))
      .pipe(dest(config.dest))
      .pipe(gulpif(!!config.destPhpPartials, filter(file => /svg$/.test(file.path))))
      .pipe(gulpif(!!config.destPhpPartials, rename({
        extname: '.php',
      })))
      .pipe(gulpif(!!config.destPhpPartials, changed(config.destPhpPartials || config.dest)))
      .pipe(gulpif(!!config.destPhpPartials, dest(config.destPhpPartials || config.dest)));
  }

  return parallel(processImages);
}
