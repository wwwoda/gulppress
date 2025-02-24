import { FontFactoryConfigs, FontFactoryOptions } from '@gulppress/gulp-font-factory';
import { Globs } from 'gulp';
export declare const createProcessFontsStream: (srcGlobs: Globs, destFolder: string, factoryConfigs?: FontFactoryConfigs, factoryOptions?: FontFactoryOptions, displayName?: string) => NodeJS.ReadWriteStream;
