/// <reference types="node" />
import { Globs, TaskFunction } from 'gulp';
import * as gulppress from '../../types';
export declare function createPotFileTask(srcGlobs: Globs, destFolder: string, wpPotOptions?: gulppress.WpPotOptions): TaskFunction;
export declare function createPotFileStream(srcGlobs: Globs, destFolder: string, wpPotOptions?: gulppress.WpPotOptions): NodeJS.ReadWriteStream;
