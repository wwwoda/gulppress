import { dest } from 'gulp';

import { createStream } from '../file';
import { getHtml } from '../html';

export const createFaviconHtmlStream = (
  destFolder: string,
  path: string,
): NodeJS.ReadWriteStream => createStream('favicon.html', getHtml(path))
  .pipe(dest(destFolder));
