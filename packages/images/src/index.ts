import { series, TaskFunction, TaskFunctionCallback } from 'gulp';
import { addDisplayNameToTask, getSuccessLogger } from '@gulppress/utils';
import type { ImagesConfig } from '@gulppress/types';
import { createGenerateSvgPhpPartialStream } from './stream/generate-svg-php-partials-stream';
import { createProcessImagesStream } from './stream/process-images-stream';
import { createClearImagesTask } from './task/clear-cache-task';

const getDisplayName = (displayName?: string): string => displayName || 'images';

const getImagesTask = (config: ImagesConfig): TaskFunction => series(
  addDisplayNameToTask(
    config.destPhpPartials
      ? `${getDisplayName(config.displayName)}:process images and generate php partials`
      : `${getDisplayName(config.displayName)}:process images`,
    (done: TaskFunctionCallback) => {
      const imagesStream = createProcessImagesStream(
        config.src,
        config.dest,
        config.imagemin,
        config.displayName,
      );
      if (config.destPhpPartials) {
        const svgStream = createGenerateSvgPhpPartialStream(imagesStream, config.destPhpPartials);
        svgStream.on('end', done);
        return;
      }
      imagesStream.on('end', done);
    },
  ),
  getSuccessLogger(getDisplayName(config.displayName)),
);

export default getImagesTask;

export const getClearImagesCacheTask = (): TaskFunction => addDisplayNameToTask(
  'clear-cache',
  createClearImagesTask(),
);
