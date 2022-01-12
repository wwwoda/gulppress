import type { Globs } from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import { createTtfToExtStream } from './streams';

export const createWoffFromTtfStream = (
  srcGlobs: Globs,
): NodeJS.ReadWriteStream => createTtfToExtStream(srcGlobs, ttf2woff, 'woff');
