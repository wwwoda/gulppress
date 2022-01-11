/// <reference types="node" />
import { Globs, TaskFunction } from 'gulp';
import { Options as SassOptions } from 'node-sass';
export declare function compileStylesTask(globs: Globs, destFolder: string, sassOptions: SassOptions | undefined, postcssPlugins: any[] | undefined, createSeparateMinFiles?: boolean, notifications?: boolean): TaskFunction;
export declare function compileStylesWithoutMinFileStream(srcGlobs: Globs, destFolder: string, sassOptions: SassOptions | undefined, postcssPlugins: any[] | undefined, _notifications?: boolean): NodeJS.ReadWriteStream;
export declare function compileStylesWithMinFileStream(srcGlobs: Globs, destFolder: string, sassOptions: SassOptions | undefined, postcssPlugins: any[] | undefined, _notifications?: boolean): NodeJS.ReadWriteStream;
