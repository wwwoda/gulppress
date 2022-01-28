/// <reference types="node" />
import type { ManifestProperties } from '../types';
export declare const createFaviconManifestTask: (destFolder: string, manifest: ManifestProperties) => () => NodeJS.ReadWriteStream;
