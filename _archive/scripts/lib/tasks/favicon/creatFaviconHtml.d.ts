/// <reference types="node" />
import { TaskFunction } from 'gulp';
import { Favicon } from '../../classes/favicon';
/**
 * Create favicon.html file
 * @param destFolder destination folder
 * @param favicon
 */
export declare function createFaviconHtmlTask(destFolder: string, favicon: Favicon): TaskFunction;
export declare function createFaviconHtmlStream(destFolder: string, favicon: Favicon): NodeJS.ReadWriteStream;
