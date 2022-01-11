import type{ Globs, TaskFunction } from 'gulp';
import { createWoff2FromTtfStream } from '../stream/create-woff2-from-ttf-stream';

export const createWoff2FromTtfTask = (
  srcGlobs: Globs,
): TaskFunction => () => createWoff2FromTtfStream(srcGlobs);
