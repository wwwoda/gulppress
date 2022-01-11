/// <reference types="node" />
import { Globs, TaskFunction } from 'gulp';
import * as gulppress from '../../types';
export declare function compileVendorScriptsTask(dirname: string, srcGlobs: Globs | gulppress.GlobsFunction, destFolder: string): TaskFunction;
export declare function compileVendorScriptsStream(dirname: string, srcGlobs?: Globs | gulppress.GlobsFunction, destFolder?: string): NodeJS.ReadWriteStream;
