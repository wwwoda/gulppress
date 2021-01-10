import { TaskFunction, dest, src } from 'gulp';

import { Favicon } from '../../classes/favicon';

const file = require('gulp-file');

/**
 * Create favicon.html file
 * @param folder destination folder
 * @param favicon
 */
export function createFaviconHtmlTask(
  folder: string,
  favicon: Favicon,
): TaskFunction {
  return () => createFaviconHtmlStream(folder, favicon);
}

export function createFaviconHtmlStream(
  folder: string,
  favicon: Favicon,
): NodeJS.ReadWriteStream {
  const html = favicon.getHtml();
  if (!html) {
    return src('./', { allowEmpty: true });
  }
  return file('favicon.html', html, { src: true })
    .pipe(dest(folder));
}
