import * as yargs from 'yargs';
import fancyLog from 'fancy-log';
import browserSync from 'browser-sync';

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
  if (typeof argv.env === 'string' && ['development', 'staging', 'production'].indexOf(argv.env) !== -1) {
    return argv.env;
  }
  return process.env.WP_ENV || 'production';
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
