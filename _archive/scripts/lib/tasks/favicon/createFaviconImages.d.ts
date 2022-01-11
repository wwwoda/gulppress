/// <reference types="node" />
import { Globs, TaskFunction } from 'gulp';
import { Favicon } from '../../classes/favicon';
import { FaviconConfig, FaviconSize } from '../../types';
/**
 * Create favicon PNGs
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder
 * @param sizes
 * @param favicon
 */
export declare function createFaviconImagesTask(srcGlobs: Globs, destFolder: string, sizes: FaviconSize[] | undefined, favicon: Favicon, imageminConfig?: FaviconConfig['imagemin']): TaskFunction;
export declare function createFaviconImagesStream(srcGlobs: Globs, destFolder: string, sizes: FaviconSize[] | undefined, favicon: Favicon, imageminConfig?: FaviconConfig['imagemin']): NodeJS.ReadWriteStream;
