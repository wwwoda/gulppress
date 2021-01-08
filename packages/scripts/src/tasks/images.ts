import { series, TaskFunction } from 'gulp';

import gulpress from '../interfaces';
import { getMinifyImagesStream } from './images/minifyImages';
import { getcreatePhpPartialFromSvgStream } from './images/createPhpPartialFromSvg';

/**
 * Get composed images task
 * @param config
 */
export default (config: gulpress.ImagesConfig):
TaskFunction => series(
  Object.assign(
    (cb: CallableFunction) => {
      const minifyStream = getMinifyImagesStream(config.src, config.dest);
      if (config.destPhpPartials) {
        getcreatePhpPartialFromSvgStream(minifyStream, config.destPhpPartials);
      }
      cb();
    },
    { displayName: 'processImages' },
  ),
);
