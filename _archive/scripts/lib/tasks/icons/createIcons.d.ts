/// <reference types="node" />
import { Globs, TaskFunction } from 'gulp';
import { IconsConfig } from '../../types';
/**
 * Minif SVGs and turn them into PHP partials
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder for images
 * @param phpPartialsFolder destination folder for PHP partials created from SVGs
 */
export declare function createIconsTask(srcGlobs: Globs, destFolder: string, phpPartialsFolder: string | null | undefined, imageminConfig?: IconsConfig['imagemin']): TaskFunction;
export declare function createIconsStream(srcGlobs: Globs, destFolder: string, phpPartialsFolder: string | null | undefined, imageminConfig?: IconsConfig['imagemin']): NodeJS.ReadWriteStream;
