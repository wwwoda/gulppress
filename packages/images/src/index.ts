import type { TaskFunction, TaskFunctionCallback } from 'gulp';
import { addDisplayNameToTask } from '@gulppress/utils';
import { createGenerateSvgPhpPartialStream } from './stream/generate-svg-php-partials-stream';
import { createProcessImagesStream } from './stream/process-images-stream';
import { createClearImagesTask } from './task/clear-cache-task';
import type { ImagesConfig } from './types';

const getImagesTask = (config: ImagesConfig): TaskFunction => addDisplayNameToTask(
  config.destPhpPartials
    ? 'images:process-images-and-generate-partials'
    : 'images:process-images',
  (done: TaskFunctionCallback) => {
    const imagesStream = createProcessImagesStream(
      config.src,
      config.dest,
      config.imagemin,
    );
    if (config.destPhpPartials) {
      const svgStream = createGenerateSvgPhpPartialStream(imagesStream, config.destPhpPartials);
      svgStream.on('end', done);
      return;
    }
    imagesStream.on('end', done);
  },
);

export default getImagesTask;

export const getClearImagesCacheTask = (): TaskFunction => addDisplayNameToTask(
  'images:clear-cache',
  createClearImagesTask(),
);
