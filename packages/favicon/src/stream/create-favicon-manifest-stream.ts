// https://stackoverflow.com/questions/51093666/conditional-gulp-task-inside-gulp-paralell-or-gulp-series
import { dest } from 'gulp';

import { createStream } from '../file';
import { getManifestString } from '../manifest';
import type { ManifestProperties } from '../types';

export const createFaviconManifestStream = (
  destFolder: string,
  config: ManifestProperties,
): NodeJS.ReadWriteStream => createStream('manifest.json', getManifestString(config))
  .pipe(dest(destFolder));
