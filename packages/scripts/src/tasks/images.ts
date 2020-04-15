import chalk from 'chalk';
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

export default function (config: gulpress.ImagesConfig | false | null | undefined): TaskFunction {
  if (!config) {
    return parallel(cb => {
      console.log(chalk.red('Images configuration missing!'));
      cb();
    });
  }

  const imagesDest = (config && config.dest) || '';
  const imagesDestPhpPartials = (config && config.destPhpPartials) || '';
  const imagesSrc = (config && config.src) || '';

  function processImages(): NodeJS.ReadWriteStream {
    return src(imagesSrc)
      .pipe(
        cache(
          imagemin([
            imagemin.gifsicle({
              interlaced: true,
            }),
            imagemin.mozjpeg({
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
      .on('error', e => { console.log(e); })
      .pipe(changed(imagesDest))
      .pipe(dest(imagesDest))
      .pipe(gulpif(!!imagesDestPhpPartials, filter(file => /svg$/.test(file.path))))
      .pipe(gulpif(!!imagesDestPhpPartials, rename({
        extname: '.php',
      })))
      .pipe(gulpif(!!imagesDestPhpPartials, changed(imagesDestPhpPartials || imagesDest)))
      .pipe(gulpif(!!imagesDestPhpPartials, dest(imagesDestPhpPartials || imagesDest)));
  }

  return parallel(processImages);
}
