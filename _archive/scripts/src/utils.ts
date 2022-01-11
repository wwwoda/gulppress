import path from 'path';

import browserSync from 'browser-sync';
import { sync } from 'glob';
import {
  Globs,
  TaskFunction,
  TaskFunctionCallback,
  parallel,
  src,
} from 'gulp';
import { SrcOptions } from 'vinyl-fs';
import * as yargs from 'yargs';

import { WatchableTasks } from './types';

// import { WatchersStatus } from './types';

const { argv } = yargs;

export function getEnv(): string {
  return process.env.NODE_ENV || process.env.WP_ENV || 'production';
}

export function watch(key?: WatchableTasks): boolean {
  if (typeof argv.watch === 'string' && key) {
    return argv.watch.split(',').includes(key);
  }
  return !!argv.watch;
}

export function inProductionEnv(): boolean {
  return getEnv() === 'production';
}

export function reload(done: CallableFunction): void {
  browserSync.reload();
  done();
}

export function getStream(
  globs?: Globs | NodeJS.ReadWriteStream,
  options?: SrcOptions,
): NodeJS.ReadWriteStream {
  if (!globs) {
    return src('.', options);
  }
  if (typeof globs === 'string' || Array.isArray(globs)) {
    return src(globs, options);
  }
  return globs;
}

export function getEmptyTask(displayName: string): TaskFunction {
  return parallel(
    (Object.assign(
      (done: TaskFunctionCallback) => {
        done();
      },
      { displayName },
    )),
  );
}

export function notEmpty<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function globsToEntryPoints(
  globs: Globs,
  withMinVersion = false,
): Record<string, string> {
  if (typeof globs === 'string') {
    return globToEntryPoints(globs, withMinVersion);
  }
  return globs.reduce<Record<string, string>>(
    (entries, glob: string) => Object.assign(
      entries,
      globToEntryPoints(glob, withMinVersion),
    ),
    {},
  );
}

export function globToEntryPoints(
  glob: string,
  withMinVersion = false,
): Record<string, string> {
  return sync(glob).reduce<Record<string, string>>((entries, filenames: string) => {
    const extension = path.extname(filenames);
    const basename = path.basename(filenames, extension);
    // eslint-disable-next-line no-param-reassign
    entries[basename] = filenames;
    if (withMinVersion === true) {
      // eslint-disable-next-line no-param-reassign
      entries[`${basename}.min`] = filenames;
    }
    return entries;
  }, {});
}
