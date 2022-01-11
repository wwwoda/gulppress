/// <reference types="node" />
import { TaskFunction } from 'gulp';
import { Favicon } from '../../classes/favicon';
/**
 * Cache configured color in Favicon
 * @param color HEX color string, for example "#ffffff"
 * @param favicon
 */
export declare function setFaviconColorTask(color: string | undefined, favicon: Favicon): TaskFunction;
export declare function setFaviconColorStream(color: string | undefined, favicon: Favicon): NodeJS.ReadWriteStream;
