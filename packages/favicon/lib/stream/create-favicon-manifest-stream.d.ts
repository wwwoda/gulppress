/// <reference types="node" />
/// <reference types="vinyl-fs" />
import type { ManifestProperties } from '../types';
export declare const createFaviconManifestStream: (destFolder: string, config: ManifestProperties) => NodeJS.ReadWriteStream;
