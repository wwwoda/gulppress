/// <reference types="node" />
import { Globs, TaskFunction } from 'gulp';
import { Favicon } from '../../classes/favicon';
/**
 * Create favicon.ico file
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder
 * @param favicon
 */
export declare function createFaviconIconTask(srcGlobs: Globs, destFolder: string, favicon: Favicon): TaskFunction;
export declare function createFaviconIconStream(srcGlobs: Globs, destFolder: string, favicon: Favicon): NodeJS.ReadWriteStream;
