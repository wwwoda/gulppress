import { dest } from 'gulp';
import type { ManifestProperties } from '../types';

import { createStream } from '../file';
import { getManifestString } from '../manifest';

export const createFaviconManifestStream = (
  destFolder: string,
  config: ManifestProperties,
  path: string,
): NodeJS.ReadWriteStream => createStream('manifest.json', getManifestString(config, path))
  .pipe(dest(destFolder));
