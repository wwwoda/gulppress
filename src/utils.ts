import fancyLog from 'fancy-log';

import browserSync = require('browser-sync');

const { argv } = require('yargs');

interface ArgvConfig {
  _: string[];
  $0: string;
  dev?: boolean;
  env?: string;
  nodev?: boolean;
  watch?: boolean | string;
}

interface WatchersStatus {
  icons: boolean;
  images: boolean;
  scripts: boolean;
  styles: boolean;
  svg: boolean;
  vendorScripts: boolean;
  [propName: string]: boolean;
}

export function getArgv(): ArgvConfig {
  return argv;
}

export function getProxyUrl(url?: string): string {
  return process.env.WP_HOME || url || '';
}

export function getTheme(theme: string): string {
  return process.env.theme || process.env.THEME || theme;
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

  if (argv.watch) {
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

export function isDev(): boolean {
  if (argv.nodev) {
    return false;
  }

  if (argv.dev) {
    return true;
  }

  if (argv.env !== undefined) {
    return argv.env === 'development';
  }

  return process.env.WP_ENV !== undefined
    ? process.env.WP_ENV === 'development'
    : false;
}

export function reload(done: CallableFunction): void {
  browserSync.reload();
  done();
}
