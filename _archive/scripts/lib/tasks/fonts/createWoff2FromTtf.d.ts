/// <reference types="node" />
import { Globs, TaskFunction } from 'gulp';
/**
 * Create favicon PNGs
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param srcFolder source folder
 */
export declare function createWoff2FromTtfTask(srcGlobs: Globs): TaskFunction;
export declare function createWoff2FromTtfStream(srcGlobs: Globs): NodeJS.ReadWriteStream;
