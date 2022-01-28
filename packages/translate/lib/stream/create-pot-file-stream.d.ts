import { Globs } from 'gulp';
import { WpPotOptions } from 'gulp-wp-pot';
export declare const createPotFileStream: (srcGlobs: Globs, destFolder: string, wpPotOptions?: WpPotOptions) => NodeJS.ReadWriteStream;
