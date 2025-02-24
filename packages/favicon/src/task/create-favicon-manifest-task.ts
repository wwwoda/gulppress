import type { ManifestProperties } from '../types';
import { createFaviconManifestStream } from '../stream/create-favicon-manifest-stream';

export const createFaviconManifestTask = (
  destFolder: string,
  manifest: ManifestProperties,
  path: string,
) => () => createFaviconManifestStream(destFolder, manifest, path);
