import browserSync from 'browser-sync';
import { parallel, TaskFunction } from 'gulp';

export default function (config: browserSync.Options): TaskFunction {
  function startServer(done: CallableFunction): void {
    browserSync.init(config);
    done();
  }

  return parallel(startServer);
}
