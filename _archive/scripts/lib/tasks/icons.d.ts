import { TaskFunction } from 'gulp';
import { IconsConfig } from '../types';
import { createIconsStream, createIconsTask } from './icons/createIcons';
export declare function getIconsTask(config: IconsConfig | undefined): TaskFunction;
export declare const subtasks: {
    createIconsTask: typeof createIconsTask;
    createIconsStream: typeof createIconsStream;
};
