import { TaskFunction } from 'gulp';
import type { FontsConfig } from './types';
export declare const getDisplayName: (displayName?: string | undefined) => string;
export declare const getTask: (config: FontsConfig) => TaskFunction;
