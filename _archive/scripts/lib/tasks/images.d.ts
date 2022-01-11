import { TaskFunction } from 'gulp';
import { ImagesConfig } from '../types';
import { createPhpPartialFromSvgStream, createPhpPartialFromSvgTask } from './images/createPhpPartialFromSvg';
import { minifyImagesStream, minifyImagesTask } from './images/minifyImages';
export declare function getImagesTask(config: ImagesConfig | undefined): TaskFunction;
export declare const subtasks: {
    createPhpPartialFromSvgTask: typeof createPhpPartialFromSvgTask;
    createPhpPartialFromSvgStream: typeof createPhpPartialFromSvgStream;
    minifyImagesTask: typeof minifyImagesTask;
    minifyImagesStream: typeof minifyImagesStream;
};
