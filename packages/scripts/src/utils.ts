import * as yargs from 'yargs';
import fancyLog from 'fancy-log';
import browserSync from 'browser-sync';
import gulppress from './interfaces';

const { argv } = yargs;

interface WatchersStatus {
  icons: boolean;
  images: boolean;
  scripts: boolean;
  styles: boolean;
  svg: boolean;
  vendorScripts: boolean;
  [propName: string]: boolean;
}

export function getEnv(): string {
  return process.env.NODE_ENV || process.env.WP_ENV || 'production';
}

export function getWatchers(): WatchersStatus {
  const watchers: WatchersStatus = {
    icons: false,
    images: false,
    scripts: false,
    styles: false,
    svg: false,
    vendorScripts: false,
  };

  if (typeof argv.watch === 'string') {
    argv.watch.split(',').forEach((watcher: string) => {
      if (!(watcher in watchers)) {
        fancyLog.error(
          '--watch argument contains unkonwn entries.  (--watch=icons,images,scripts,styles,svg,vendorScripts)',
        );
      } else {
        watchers[watcher] = true;
      }
    });
  }

  return watchers;
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

export function getConfigSource(config: gulppress.BasicTaskConfig): string | string[] {
  return (config && config.src) || '';
}

export function getConfigDestination(config: gulppress.BasicTaskConfig): string {
  return (config && config.dest) || '';
}
