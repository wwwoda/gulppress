import {
  Globs,
  dest,
  src,
} from 'gulp';
import imagemin from 'gulp-imagemin';
import sharp from 'sharp';
import resizeFavicon from '../plugin/sharp';

export const createFaviconImagesStream = (
  srcGlobs: Globs,
  destFolder: string,
): NodeJS.ReadWriteStream => src(srcGlobs, { allowEmpty: true })
  .pipe(resizeFavicon({
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
  }))
  .pipe(imagemin())
  .pipe(dest(destFolder));
