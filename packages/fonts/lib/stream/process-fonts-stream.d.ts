import { FontFactoryConfigs, FontFactoryOptions } from '@gulppress/gulp-font-factory';
import { Globs } from 'gulp';
export declare const createProcessFontsStream: (srcGlobs: Globs, destFolder: string, factoryConfigs?: FontFactoryConfigs | undefined, factoryOptions?: FontFactoryOptions | undefined, displayName?: string) => NodeJS.ReadWriteStream;
