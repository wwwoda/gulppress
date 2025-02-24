import type { ManifestProperties } from '../types';
export declare const createFaviconManifestTask: (destFolder: string, manifest: ManifestProperties, path: string) => () => NodeJS.ReadWriteStream;
