import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
import cache from 'gulp-cache';
import changed from 'gulp-changed';
import filter from 'gulp-filter';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';

interface ImagesConfig {
  src: string | string[];
  dest: string;
}

export default function (config: ImagesConfig): TaskFunction {
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
      .pipe(changed(config.dest))
      .pipe(dest(config.dest))
      .pipe(filter(file => /svg$/.test(file.path)))
      .pipe(
        rename({
          extname: '.php',
        }),
      )
      .pipe(changed(config.dest))
      .pipe(dest(config.dest));
  }

  return parallel(processImages);
}
