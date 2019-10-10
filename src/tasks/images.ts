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

interface ImagesConfig {
  src: string | string[];
  dest: string;
  phpPartialsDest?: string | null | undefined;
}

function shouldCreatePhpPartials(config: ImagesConfig): boolean {
  return !!config.phpPartialsDest;
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
      .pipe(gulpif(shouldCreatePhpPartials(config), filter(file => /svg$/.test(file.path))))
      .pipe(gulpif(shouldCreatePhpPartials(config), rename({
        extname: '.php',
      })))
      .pipe(gulpif(shouldCreatePhpPartials(config), changed(config.phpPartialsDest || config.dest)))
      .pipe(gulpif(shouldCreatePhpPartials(config), dest(config.phpPartialsDest || config.dest)));
  }

  return parallel(processImages);
}
