import * as yargs from 'yargs';
import fancyLog from 'fancy-log';
import browserSync from 'browser-sync';
import gulpress from './interfaces';

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

export function getEnv(env?: string): string {
  if (typeof argv.env === 'string' && ['development', 'staging', 'production'].indexOf(argv.env) !== -1) {
    return argv.env;
  }
  return process.env.WP_ENV || env || 'production';
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

export function isDevEnv(config: gulpress.BaseConfig | false | null | undefined): boolean {
  const env = (config && config.environment) || '';
  if (getEnv(env) === 'development') {
    return true;
  }

  return false;
}

export function reload(done: CallableFunction): void {
  browserSync.reload();
  done();
}
