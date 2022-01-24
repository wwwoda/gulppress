import {
  Globs,
  dest,
  src,
} from 'gulp';
import sharp from 'sharp';
import processImages from '@gulppress/gulp-image-factory';
import createIco from '../plugin/to-ico';

export const createFaviconIconStream = (
  srcGlobs: Globs,
  destFolder: string,
): NodeJS.ReadWriteStream => src(srcGlobs, { allowEmpty: true })
  .pipe(processImages({
    '*.svg': [{
      format: 'png',
      resize: {
        width: 32,
        height: 32,
        fit: sharp.fit.inside,
      },
      rename: 'favicon.png',
    }],
  }, {
    silent: true,
    passThroughMatched: false,
    passThroughUnmatched: false,
  }))
  .pipe(createIco())
  .pipe(dest(destFolder));
