import { Globs, dest, src } from 'gulp';
import sort from 'gulp-sort';
import wpPot, { WpPotOptions } from 'gulp-wp-pot';

export const createPotFileStream = (
  srcGlobs: Globs,
  destFolder: string,
  wpPotOptions: WpPotOptions = {},
): NodeJS.ReadWriteStream => src(srcGlobs, { allowEmpty: true })
  .pipe(sort())
  .pipe(wpPot(wpPotOptions))
  .pipe(dest(`${destFolder}`));
