import type{ Globs, TaskFunction } from 'gulp';
import { createWoffFromTtfStream } from '../stream/create-woff-from-ttf-stream';

export const createWoffFromTtfTask = (
  srcGlobs: Globs,
): TaskFunction => () => createWoffFromTtfStream(srcGlobs);
