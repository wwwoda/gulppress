/// <reference types="node" />
/// <reference types="vinyl-fs" />
import { ImageFactoryConfigs, ImageFactoryOptions } from '@gulppress/gulp-image-factory';
import { Globs } from 'gulp';
import type { ImageMinOptions } from '../types';
export declare const createProcessImagesStream: (srcGlobs: Globs, destFolder: string, imageminOptions?: ImageMinOptions | undefined, imageFactoryConfigs?: ImageFactoryConfigs | undefined, imageFactoryOptions?: ImageFactoryOptions | undefined, disableCache?: boolean | undefined, disableGulpChanged?: boolean | undefined, disableImagemin?: boolean | undefined, displayName?: string) => NodeJS.ReadWriteStream;
