import { series, TaskFunction } from 'gulp';

import gulppress from '../interfaces';
import { VendorPackages } from '../classes/vendorPackages';
// import { getCompileVendorPackagesTask } from './vendorScripts/compileVendorPackages';
import { getCompileVendorScriptsStream } from './vendorScripts/compileVendorScripts';
// import { createVendorScriptsVersionFile } from './vendorScripts/createVendorPackagesVersionFile';
import { getBustCacheStream } from './utils/bustCache';
import { getMergeCacheBusterJsonStream } from './vendorScripts/mergeJson';

export default function (config: gulppress.VendorScriptsConfig): TaskFunction {
  const packages = new VendorPackages();
  const scripts = typeof config.src === 'string' ? [config.src] : config.src || [];
  return series(
    (Object.assign(
      (cb: CallableFunction) => {
        packages.init(config.packages);
        return getCompileVendorScriptsStream(
          cb,
          () => [...scripts, ...packages.getSources()],
          config.dest,
        );
      },
      { displayName: 'compileVendorScripts' },
    )),
    (Object.assign(
      (cb: CallableFunction) => {
        const cacheBuster = getBustCacheStream(`${config.dest}/*.js`, config.dest, '.assets.json');
        cacheBuster.on('finish', () => {
          getMergeCacheBusterJsonStream(config.dest, () => packages.getVersions());
          return cb();
        });
      },
      { displayName: 'bustCacheForVendorScripts' },
    )),
  );
}
