import { parallel, series, TaskFunction } from 'gulp';

import gulppress from '../interfaces';
import { Favicon } from '../classes/favicon';

import { getCreateFaviconIconTask } from './favicon/createFaviconIcon';
import { getCreateFaviconImagesTask } from './favicon/createFaviconImages';
import { getFaviconCreateHtmlTask } from './favicon/creatFaviconHtml';
import { getCreateFaviconManifestTask } from './favicon/createFaviconManifest';
import { getSetFaviconColorTask } from './favicon/setFaviconColor';

/**
 * Get composed favicon task
 * @param config
 */
export default function getFaviconTask(config: gulppress.FaviconConfig): TaskFunction {
  const favicon = new Favicon();
  return series(
    (Object.assign(
      getCreateFaviconImagesTask(config.src, config.dest, config.sizes, favicon),
      { displayName: 'faviconToImage' },
    )),
    (Object.assign(
      getSetFaviconColorTask(config.color, favicon),
      { displayName: 'setColor' },
    )),
    parallel(
      (Object.assign(
        getCreateFaviconIconTask(config.src, config.dest, favicon),
        { displayName: 'faviconToIco' },
      )),
      (Object.assign(
        getFaviconCreateHtmlTask(config.dest, favicon),
        { displayName: 'createHtml' },
      )),
      (Object.assign(
        getCreateFaviconManifestTask(config.dest, favicon),
        { displayName: 'createManifest' },
      )),
    ),
  );
}
