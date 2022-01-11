/// <reference types="node" />
import { Globs, TaskFunction } from 'gulp';
import { ImagesConfig } from '../../types';
export declare function minifyImagesTask(srcGlobs: Globs | NodeJS.ReadWriteStream, destFolder: string, imageminConfig?: ImagesConfig['imagemin']): TaskFunction;
export declare function minifyImagesStream(srcGlobs: Globs | NodeJS.ReadWriteStream, destFolder: string, imageminConfig?: ImagesConfig['imagemin']): NodeJS.ReadWriteStream;
