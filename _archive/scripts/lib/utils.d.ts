/// <reference types="node" />
import { Globs, TaskFunction } from 'gulp';
import { SrcOptions } from 'vinyl-fs';
import { WatchableTasks } from './types';
export declare function getEnv(): string;
export declare function watch(key?: WatchableTasks): boolean;
export declare function inProductionEnv(): boolean;
export declare function reload(done: CallableFunction): void;
export declare function getStream(globs?: Globs | NodeJS.ReadWriteStream, options?: SrcOptions): NodeJS.ReadWriteStream;
export declare function getEmptyTask(displayName: string): TaskFunction;
export declare function notEmpty<T>(value: T | undefined): value is T;
export declare function globsToEntryPoints(globs: Globs, withMinVersion?: boolean): Record<string, string>;
export declare function globToEntryPoints(glob: string, withMinVersion?: boolean): Record<string, string>;
