import browserSync from 'browser-sync';
import { parallel, TaskFunction } from 'gulp';

export default (config: browserSync.Options):
TaskFunction => parallel(
  (Object.assign(getStartServerStream(config), { displayName: 'startServer' })),
);

export function getStartServerStream(config: browserSync.Options) {
  return (cb: CallableFunction): void => {
    browserSync.init(config);
    cb();
  };
}
