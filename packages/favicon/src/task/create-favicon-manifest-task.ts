import { createFaviconManifestStream } from '../stream/create-favicon-manifest-stream';
import type { ManifestProperties } from '../types';

export const createFaviconManifestTask = (
  destFolder: string,
  manifest: ManifestProperties,
) => () => createFaviconManifestStream(destFolder, manifest);
