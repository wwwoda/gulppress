import { TaskFunction } from 'gulp';
import { FontsConfig } from '../types';
import { copyFontsStream, copyFontsTask } from './fonts/copyFonts';
import { createWoff2FromTtfStream, createWoff2FromTtfTask } from './fonts/createWoff2FromTtf';
import { createWoffFromTtfStream, createWoffFromTtfTask } from './fonts/createWoffFromTtf';
export declare function getFontsTask(config: FontsConfig | undefined): TaskFunction;
export declare const subtasks: {
    copyFontsStream: typeof copyFontsStream;
    copyFontsTask: typeof copyFontsTask;
    createWoff2FromTtfStream: typeof createWoff2FromTtfStream;
    createWoff2FromTtfTask: typeof createWoff2FromTtfTask;
    createWoffFromTtfStream: typeof createWoffFromTtfStream;
    createWoffFromTtfTask: typeof createWoffFromTtfTask;
};
