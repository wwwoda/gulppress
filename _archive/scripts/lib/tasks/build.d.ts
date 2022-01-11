import { Globs, TaskFunction } from 'gulp';
import { Configuration } from 'webpack';
import { MainConfig } from '../types';
export declare function getBuildTask(config: MainConfig, webpackConfig: Configuration): TaskFunction;
export declare function getBuildTasks(config: MainConfig, webpackConfig: Configuration): TaskFunction[];
export declare function getBuildDestFolders(config: MainConfig): Globs;
