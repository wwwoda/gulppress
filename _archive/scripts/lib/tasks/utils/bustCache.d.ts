/// <reference types="node" />
import { Globs, TaskFunction } from 'gulp';
export declare function bustCacheTask(srcGlobs: Globs, destFolder: string, fileName?: string): TaskFunction;
export declare function bustCacheStream(srcGlobs: Globs, destFolder: string, fileName?: string): NodeJS.ReadWriteStream;
