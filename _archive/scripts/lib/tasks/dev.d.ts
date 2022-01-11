import { Globs, TaskFunction } from 'gulp';
import { Configuration } from 'webpack';
import { MainConfig } from '../types';
export declare function getDevTask(config: MainConfig, webpackConfig: Configuration): TaskFunction;
export declare function getDevTasks(config: MainConfig, webpackConfig: Configuration): TaskFunction[];
export declare function getDevDestFolders(config: MainConfig): Globs;
