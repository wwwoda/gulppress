import type { ImagesConfig } from '@gulppress/base';
import type { TaskFunction, TaskFunctionCallback } from 'gulp';

const getTask = (config: ImagesConfig): TaskFunction => {
  return Object.assign(
    (done: TaskFunctionCallback) => {
      const minifyStream = getMinifyImagesStream(
        config.src,
        config.dest,
        config.imagemin,
      );
      if (config.destPhpPartials) {
        getCreateSvgPhpPartialStream(minifyStream, config.destPhpPartials);
      }
      done();
    },
    {
      displayName: config.destPhpPartials
        ? 'images:minify-and-create-partials'
        : 'images:minify',
    },
  );
}

export default getTask;
