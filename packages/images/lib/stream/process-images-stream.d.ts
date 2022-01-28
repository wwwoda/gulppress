/// <reference types="node" />
/// <reference types="vinyl-fs" />
import { ImageFactoryConfigs, ImageFactoryOptions } from '@gulppress/gulp-image-factory';
import { Globs } from 'gulp';
import type { ImageMinOptions } from '../types';
export declare const createProcessImagesStream: (srcGlobs: Globs, destFolder: string, imageMinOptions?: ImageMinOptions | undefined, imageFactoryConfigs?: ImageFactoryConfigs | undefined, imageFactoryOptions?: ImageFactoryOptions | undefined, displayName?: string) => NodeJS.ReadWriteStream;
