import { ImageFactoryConfigs, ImageFactoryOptions } from '@gulppress/gulp-image-factory';
import { Globs } from 'gulp';
import type { ImageMinOptions } from '../types';
export declare const createProcessImagesStream: (srcGlobs: Globs, destFolder: string, imageminOptions?: ImageMinOptions, imageFactoryConfigs?: ImageFactoryConfigs, imageFactoryOptions?: ImageFactoryOptions, disableCache?: boolean, disableGulpChanged?: boolean, disableImagemin?: boolean, displayName?: string) => NodeJS.ReadWriteStream;
