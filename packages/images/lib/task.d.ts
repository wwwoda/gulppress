import { TaskFunction } from 'gulp';
import type { ImagesConfig } from './types';
export declare const getTask: (config: ImagesConfig) => TaskFunction;
export declare const getClearImagesCacheTask: () => TaskFunction;
