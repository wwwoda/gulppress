// https://stackoverflow.com/questions/51093666/conditional-gulp-task-inside-gulp-paralell-or-gulp-series
import { dest, src } from 'gulp';

import { Favicon } from '../../classes/favicon';

const file = require('gulp-file');

/**
 * Create manifest.json file
 * @param folder destination folder
 * @param favicon
 */
export function getCreateFaviconManifestTask(
  folder: string,
  favicon: Favicon,
) {
  return (): NodeJS.ReadWriteStream => {
    const manifest = favicon.getManifest();
    if (!manifest) {
      return src('./');
    }
    return file('manifest.json', manifest, { src: true })
      .pipe(dest(folder));
  };
}
