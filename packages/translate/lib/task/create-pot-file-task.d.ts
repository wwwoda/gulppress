import type { Globs, TaskFunction } from 'gulp';
import type { WpPotOptions } from 'gulp-wp-pot';
export declare const createPotFileTask: (srcGlobs: Globs, destFolder: string, wpPotOptions?: WpPotOptions) => TaskFunction;
