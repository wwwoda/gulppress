import {
  dest,
  Globs,
  TaskFunction,
} from 'gulp';
import cache from 'gulp-cache';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import { getStream } from '../../utils';

export function getMinifyImagesTask(
  globs: Globs | NodeJS.ReadWriteStream,
  folder: string,
): TaskFunction {
  return () => (getMinifyImagesStream(globs, folder));
}

export function getMinifyImagesStream(
  globs: Globs | NodeJS.ReadWriteStream,
  folder: string,
): NodeJS.ReadWriteStream {
  return getStream(globs, { allowEmpty: true })
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
    .pipe(changed(folder))
    .pipe(dest(folder));
}
