/// <reference types="node" />
import { Globs, TaskFunction } from 'gulp';
/**
 * Create favicon PNGs
 * @param globs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder for images
 */
export declare function createPhpPartialFromSvgTask(globs: Globs | NodeJS.ReadWriteStream, destFolder: string): TaskFunction;
/**
 * Create favicon PNGs
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder for images
 */
export declare function createPhpPartialFromSvgStream(srcGlobs: Globs | NodeJS.ReadWriteStream, destFolder: string): NodeJS.ReadWriteStream;
