import { TaskFunction, parallel, series } from 'gulp';

import { MainConfig } from '../types';
import { getEmptyTask } from '../utils';
import { getCleanTask } from './clean';
import { getFaviconTask } from './favicon';
import { getFontsTask } from './fonts';
import { getIconsTask } from './icons';
import { getImagesTask } from './images';
import { getTranslationTask } from './translate';
import { getVendorScriptsTask } from './vendorScripts';

export function getAssetsTask(config: MainConfig): TaskFunction {
  const assetsTasks = getAssetsTasks(config);
  if (assetsTasks.length) {
    return series(
      getCleanTask(getAssetsDestFolders(config)),
      parallel(...assetsTasks),
    );
  }
  return getEmptyTask('Assets task pipeline is empty');
}

export function getAssetsTasks(config: MainConfig): TaskFunction[] {
  const assetsTasks: TaskFunction[] = [];
  if (config.favicon) {
    assetsTasks.push(getFaviconTask(config.favicon));
  }
  if (config.fonts) {
    assetsTasks.push(getFontsTask(config.fonts));
  }
  if (config.icons) {
    assetsTasks.push(getIconsTask(config.icons));
  }
  if (config.images) {
    assetsTasks.push(getImagesTask(config.images));
  }
  if (config.translation) {
    assetsTasks.push(getTranslationTask(config.translation));
  }
  if (config.vendorScripts) {
    assetsTasks.push(getVendorScriptsTask(config.vendorScripts, config.base.dirname));
  }
  return assetsTasks;
}

export function getAssetsDestFolders(config: MainConfig): (string | undefined)[] {
  return [
    config.favicon?.dest,
    config.fonts?.dest,
    config.icons?.dest,
    config.images?.dest,
    config.translation?.dest,
    config.vendorScripts?.dest,
  ];
}
