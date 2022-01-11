/// <reference types="node" />
import { Globs, TaskFunction } from 'gulp';
/**
 * Create favicon PNGs
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder
 */
export declare function copyFontsTask(srcGlobs: Globs, destFolder: string): TaskFunction;
export declare function copyFontsStream(srcGlobs: Globs, destFolder: string): NodeJS.ReadWriteStream;
