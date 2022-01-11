/// <reference types="node" />
import { Favicon } from '../../classes/favicon';
/**
 * Create manifest.json file
 * @param destFolder destination folder
 * @param favicon
 */
export declare function createFaviconManifestTask(destFolder: string, favicon: Favicon): () => NodeJS.ReadWriteStream;
export declare function createFaviconManifestStream(destFolder: string, favicon: Favicon): NodeJS.ReadWriteStream;
