import { TaskFunction, series } from 'gulp';

import { VendorPackages } from '../classes/vendorPackages';
import { VendorScriptsConfig } from '../types';
import { getEmptyTask } from '../utils';
import { bustCacheStream } from './utils/bustCache';
import {
  compileVendorScriptsStream,
  compileVendorScriptsTask,
} from './vendorScripts/compileVendorScripts';
import {
  mergeCacheBusterJsonStream,
  mergeCacheBusterJsonTask,
} from './vendorScripts/mergeCacheBusterJson';

export function getVendorScriptsTask(
  config: VendorScriptsConfig | undefined,
  dirname: string,
): TaskFunction {
  return config
    ? composeVendorScriptsTasks(config, dirname)
    : getEmptyTask('Vendor scripts task is missing config.');
}

function composeVendorScriptsTasks(
  config: VendorScriptsConfig,
  dirname: string,
): TaskFunction {
  const packages = new VendorPackages();
  const scripts = typeof config.src === 'string' ? [config.src] : config.src || [];
  return series(
    (Object.assign(
      () => {
        packages.init(config.packages);
        return compileVendorScriptsStream(
          dirname,
          () => [...scripts, ...packages.getSources()],
          config.dest,
        );
      },
      { displayName: 'compileVendorScripts' },
    )),
    (Object.assign(
      <T extends Function>(cb: T) => {
        const cacheBuster = bustCacheStream(`${config.dest}/*.js`, config.dest, '.assets.json');
        cacheBuster.on('finish', () => {
          mergeCacheBusterJsonStream(config.dest, () => packages.getVersions());
          return cb();
        });
      },
      { displayName: 'bustCacheForVendorScripts' },
    )),
  );
}

export const subtasks = {
  compileVendorScriptsStream,
  compileVendorScriptsTask,
  mergeCacheBusterJsonStream,
  mergeCacheBusterJsonTask,
};
