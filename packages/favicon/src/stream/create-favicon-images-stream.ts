import {
  Globs,
  dest,
  src,
} from 'gulp';
import imagemin from 'gulp-imagemin';
import sharp from 'sharp';
import processImages from '@gulppress/gulp-image-factory';

export const createFaviconImagesStream = (
  srcGlobs: Globs,
  destFolder: string,
): NodeJS.ReadWriteStream => src(srcGlobs, { allowEmpty: true })
  .pipe(processImages({
    '*.svg': [
      {
        format: 'png',
        resize: {
          width: 180,
          height: 180,
          fit: sharp.fit.inside,
        },
        rename: 'apple-touch-icon.png',
      },
      {
        format: 'png',
        resize: {
          width: 192,
          height: 192,
          fit: sharp.fit.inside,
        },
        rename: 'icon-192.png',
      },
      {
        format: 'png',
        resize: {
          width: 512,
          height: 512,
          fit: sharp.fit.inside,
        },
        rename: 'icon-512.png',
      },
    ],
  }, {
    silent: true,
    passThroughMatched: false,
    passThroughUnmatched: false,
  }))
  .pipe(imagemin({ silent: true }))
  .pipe(dest(destFolder));
