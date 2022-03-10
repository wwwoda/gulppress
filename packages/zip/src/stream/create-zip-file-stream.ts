import { Globs, dest, src } from 'gulp';
import wpPot, { WpPotOptions } from 'gulp-wp-pot';

export const createZipFileStream = (
  srcGlobs: Globs,
  destFolder: string,
  wpPotOptions: WpPotOptions = {},
): NodeJS.ReadWriteStream => src(srcGlobs, { allowEmpty: true })
  .pipe(wpPot(wpPotOptions))
  .pipe(dest(`${destFolder}`));
