import type { FontFactoryConfigs, FontFactoryOptions } from '@gulppress/gulp-font-factory';
import type { Globs, TaskFunction } from 'gulp';
export declare const createProcessFontsTask: (srcGlobs: Globs, destFolder: string, factoryConfigs?: FontFactoryConfigs, factoryOptions?: FontFactoryOptions, displayName?: string) => TaskFunction;
