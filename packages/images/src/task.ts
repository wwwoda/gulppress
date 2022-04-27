import { series, TaskFunction, TaskFunctionCallback } from 'gulp';
import { addDisplayNameToTask, getSuccessLogger } from '@gulppress/utils';
import yargs from 'yargs/yargs';
import type { ImagesConfig } from './types';
import { createGenerateSvgPhpPartialStream } from './stream/generate-svg-php-partials-stream';
import { createProcessImagesStream } from './stream/process-images-stream';
import { createClearImagesTask } from './task/clear-cache-task';

const getDisplayName = (displayName?: string): string => displayName || 'images';

export const getTask = (config: ImagesConfig): TaskFunction => series(
  addDisplayNameToTask(
    config.destPhpPartials
      ? `${getDisplayName(config.displayName)}:process images and generate php partials`
      : `${getDisplayName(config.displayName)}:process images`,
    (done: TaskFunctionCallback) => {
      const { all } = yargs(process.argv.slice(2)).options({
        all: { type: 'boolean', default: false },
      }).parseSync();
      const imagesStream = createProcessImagesStream(
        config.src,
        config.dest,
        config.imageminOptions,
        config.imageFactoryConfigs,
        config.imageFactoryOptions,
        all || config.disableCache,
        all || config.disableGulpChanged,
        config.disableImagemin,
        `${getDisplayName(config.displayName)} => process images`,
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

export const getClearImagesCacheTask = (): TaskFunction => addDisplayNameToTask(
  'clear-cache',
  createClearImagesTask(),
);
