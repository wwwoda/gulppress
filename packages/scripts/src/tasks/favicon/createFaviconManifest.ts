// https://stackoverflow.com/questions/51093666/conditional-gulp-task-inside-gulp-paralell-or-gulp-series
import { dest, src } from 'gulp';

import { Favicon } from '../../classes/favicon';

const file = require('gulp-file');

/**
 * Create manifest.json file
 * @param destFolder destination folder
 * @param favicon
 */
export function createFaviconManifestTask(
  destFolder: string,
  favicon: Favicon,
) {
  return () => createFaviconManifestStream(destFolder, favicon);
}

export function createFaviconManifestStream(
  destFolder: string,
  favicon: Favicon,
): NodeJS.ReadWriteStream {
  const manifest = favicon.getManifest();
  if (!manifest) {
    return src('./', { allowEmpty: true });
  }
  return file('manifest.json', manifest, { src: true })
    .pipe(dest(destFolder));
}
