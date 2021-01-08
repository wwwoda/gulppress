import { dest, src } from 'gulp';

import { Favicon } from '../../classes/favicon';

const file = require('gulp-file');

/**
 * Create favicon.html file
 * @param folder destination folder
 * @param favicon
 */
export function getFaviconCreateHtmlTask(
  folder: string,
  favicon: Favicon,
) {
  return (): NodeJS.ReadWriteStream => {
    const html = favicon.getHtml();
    if (!html) {
      return src('./');
    }
    return file('favicon.html', html, { src: true })
      .pipe(dest(folder));
  };
}
