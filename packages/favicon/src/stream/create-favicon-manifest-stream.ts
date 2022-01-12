import type { ManifestProperties } from '@gulppress/types';
import { dest } from 'gulp';

import { createStream } from '../file';
import { getManifestString } from '../manifest';

export const createFaviconManifestStream = (
  destFolder: string,
  config: ManifestProperties,
): NodeJS.ReadWriteStream => createStream('manifest.json', getManifestString(config))
  .pipe(dest(destFolder));
