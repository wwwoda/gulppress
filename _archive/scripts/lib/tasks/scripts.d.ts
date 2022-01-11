import { TaskFunction } from 'gulp';
import { Configuration } from 'webpack';
import { ScriptConfig } from '../types';
import { compileScriptsStream, compileScriptsTask } from './scripts/compileScripts';
export declare function getScriptsTask(config: ScriptConfig | undefined, webpackConfig: Configuration | undefined): TaskFunction;
export declare const subtasks: {
    compileScriptsTask: typeof compileScriptsTask;
    compileScriptsStream: typeof compileScriptsStream;
};
