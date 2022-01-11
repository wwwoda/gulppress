import { TaskFunction } from 'gulp';
import { TranslationConfig } from '../types';
import { createPotFileStream, createPotFileTask } from './translate/createPotFile';
export declare function getTranslationTask(config: TranslationConfig | undefined): TaskFunction;
export declare const subtasks: {
    createPotFileStream: typeof createPotFileStream;
    createPotFileTask: typeof createPotFileTask;
};
