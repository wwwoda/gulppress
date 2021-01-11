import { TaskFunction, dest, src } from 'gulp';

import { Favicon } from '../../classes/favicon';

const file = require('gulp-file');

/**
 * Create favicon.html file
 * @param destFolder destination folder
 * @param favicon
 */
export function createFaviconHtmlTask(
  destFolder: string,
  favicon: Favicon,
): TaskFunction {
  return () => createFaviconHtmlStream(destFolder, favicon);
}

export function createFaviconHtmlStream(
  destFolder: string,
  favicon: Favicon,
): NodeJS.ReadWriteStream {
  const html = favicon.getHtml();
  if (!html) {
    return src('./', { allowEmpty: true });
  }
  return file('favicon.html', html, { src: true })
    .pipe(dest(destFolder));
}
