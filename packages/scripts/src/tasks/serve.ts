import chalk from 'chalk';
import browserSync from 'browser-sync';
import { parallel, TaskFunction } from 'gulp';

export default function (config: browserSync.Options | null | undefined): TaskFunction {
  function startServer(cb: CallableFunction): void {
    if (config) {
      browserSync.init(config);
    } else {
      console.log(chalk.red('Browsersync configuration missing!'));
    }
    cb();
  }

  return parallel(startServer);
}
