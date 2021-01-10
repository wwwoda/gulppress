import browserSync from 'browser-sync';
import {
  Globs,
  TaskFunction,
  parallel,
  src,
} from 'gulp';
import { SrcOptions } from 'vinyl-fs';
import * as yargs from 'yargs';

import { WatchersStatus } from './types';

const { argv } = yargs;

export function getEnv(): string {
  return process.env.NODE_ENV || process.env.WP_ENV || 'production';
}

export function getWatchers(): WatchersStatus {
  if (typeof argv.watch !== 'string') {
    return {};
  }
  const args = argv.watch.split(',');

  return {
    icons: args.includes('icons'),
    images: args.includes('images'),
    scripts: args.includes('scripts'),
    styles: args.includes('styles'),
  };
}

export function shouldWatch(): boolean {
  if (typeof argv.watch !== 'string') {
    return false;
  }
  const args = argv.watch.split(',');
  return ['icons', 'images', 'scripts', 'styles'].some(i => args.includes(i));
}

export function isDevEnv(): boolean {
  if (getEnv() === 'development') {
    return true;
  }

  return false;
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
      (cb: CallableFunction) => {
        cb();
      },
      { displayName },
    )),
  );
}
