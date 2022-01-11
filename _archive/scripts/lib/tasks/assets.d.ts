import { Globs, TaskFunction } from 'gulp';
import { MainConfig } from '../types';
export declare function getAssetsTask(config: MainConfig): TaskFunction;
export declare function getAssetsTasks(config: MainConfig): TaskFunction[];
export declare function getAssetsDestFolders(config: MainConfig): Globs;
