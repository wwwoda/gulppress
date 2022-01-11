import { TaskFunction } from 'gulp';
import { StylesConfig } from '../types';
import { compileStylesTask, compileStylesWithMinFileStream, compileStylesWithoutMinFileStream } from './styles/compileStyles';
export declare function getStylesTask(config: StylesConfig | undefined, createSeparateMinFiles?: boolean, notifications?: boolean): TaskFunction;
export declare const subtasks: {
    compileStylesTask: typeof compileStylesTask;
    compileStylesWithMinFileStream: typeof compileStylesWithMinFileStream;
    compileStylesWithoutMinFileStream: typeof compileStylesWithoutMinFileStream;
};
