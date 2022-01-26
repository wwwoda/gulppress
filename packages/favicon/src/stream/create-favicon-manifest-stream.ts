import { dest } from 'gulp';
import type { ManifestProperties } from '../types';

import { createStream } from '../file';
import { getManifestString } from '../manifest';

export const createFaviconManifestStream = (
  destFolder: string,
  config: ManifestProperties,
): NodeJS.ReadWriteStream => createStream('manifest.json', getManifestString(config))
  .pipe(dest(destFolder));
