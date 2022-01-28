import type { ImageFactoryConfigs, ImageFactoryOptions } from '@gulppress/gulp-image-factory';
import type { Globs, TaskFunction } from 'gulp';
import type { ImageMinOptions } from '../types';
export declare const createProcessImagesTask: (srcGlobs: Globs, destFolder: string, imageMinOptions?: ImageMinOptions | undefined, imageFactoryConfigs?: ImageFactoryConfigs | undefined, imageFactoryOptions?: ImageFactoryOptions | undefined, displayName?: string | undefined) => TaskFunction;
