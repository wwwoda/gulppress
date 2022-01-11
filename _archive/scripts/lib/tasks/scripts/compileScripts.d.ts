/// <reference types="node" />
import { Globs, TaskFunction, TaskFunctionCallback } from 'gulp';
import { Configuration as WebpackConfiguration } from 'webpack';
export declare function compileScriptsTask(srcGlobs: Globs, destFolder: string, webpackConfig: WebpackConfiguration): TaskFunction;
export declare function compileScriptsStream(srcGlobs: Globs, destFolder: string, webpackConfig: WebpackConfiguration, done: TaskFunctionCallback): NodeJS.ReadWriteStream;
