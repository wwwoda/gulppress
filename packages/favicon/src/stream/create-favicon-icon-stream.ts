import {
  Globs,
  dest,
  src,
} from 'gulp';
import sharp from 'sharp';

import resize from '../plugin/sharp';
import createIco from '../plugin/to-ico';

export const createFaviconIconStream = (
  srcGlobs: Globs,
  destFolder: string,
): NodeJS.ReadWriteStream => src(srcGlobs, { allowEmpty: true })
  .pipe(resize({
    '*.svg': [{
      format: 'png',
      resize: {
        width: 32,
        height: 32,
        fit: sharp.fit.inside,
      },
      rename: 'favicon.png',
    }],
  }))
  .pipe(createIco())
  .pipe(dest(destFolder));
