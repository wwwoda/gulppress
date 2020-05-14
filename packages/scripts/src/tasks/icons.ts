import chalk from 'chalk';
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

export default function (config: gulpress.IconsConfig | null | undefined): TaskFunction {
  if (!config) {
    return parallel(cb => {
      console.log(chalk.red('Icons configuration missing!'));
      cb();
    });
  }

  const iconsDest = (config && config.dest) || '';
  const iconsDestPhpPartials = (config && config.destPhpPartials) || '';
  const iconsSrc = (config && config.src) || '';

  function processIcons(): NodeJS.ReadWriteStream {
    return src(iconsSrc, { allowEmpty: true })
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
      .pipe(changed(iconsDest))
      .pipe(dest(iconsDest))
      .pipe(gulpif(!!iconsDestPhpPartials, rename({
        extname: '.php',
      })))
      .pipe(gulpif(!!iconsDestPhpPartials, changed(iconsDestPhpPartials || iconsDest)))
      .pipe(gulpif(!!iconsDestPhpPartials, dest(iconsDestPhpPartials || iconsDest)));
  }

  return parallel(processIcons);
}
