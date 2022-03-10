import {
  Globs,
  dest,
  src,
} from 'gulp';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';

export const createFaviconSvgStream = (
  srcGlobs: Globs,
  destFolder: string,
): NodeJS.ReadWriteStream => src(srcGlobs, { allowEmpty: true })
  .pipe(imagemin({ silent: true }))
  .pipe(rename({ basename: 'favicon' }))
  .pipe(dest(destFolder));
