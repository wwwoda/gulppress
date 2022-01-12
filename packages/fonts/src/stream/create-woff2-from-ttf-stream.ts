import type { Globs } from 'gulp';
import ttf2woff2 from 'gulp-ttf2woff2';
import { createTtfToExtStream } from './streams';

export const createWoff2FromTtfStream = (
  srcGlobs: Globs,
): NodeJS.ReadWriteStream => createTtfToExtStream(srcGlobs, ttf2woff2, 'woff2');
