/// <reference types="node" />
import { Globs, TaskFunction } from 'gulp';
/**
 * Create favicon PNGs
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param srcFolder source folder
 */
export declare function createWoffFromTtfTask(srcGlobs: Globs): TaskFunction;
export declare function createWoffFromTtfStream(srcGlobs: Globs): NodeJS.ReadWriteStream;
