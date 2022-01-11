import type { TaskFunction } from 'gulp';

import { createFaviconHtmlStream } from '../stream/create-favicon-html-stream';

export const createFaviconHtmlTask = (
  destFolder: string,
): TaskFunction => () => createFaviconHtmlStream(destFolder);
