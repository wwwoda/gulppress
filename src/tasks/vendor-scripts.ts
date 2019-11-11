import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
import gulpress from '../interfaces';

export default function (config: gulpress.VendorScriptsConfig): TaskFunction {
  function processVendorScripts(): NodeJS.ReadWriteStream {
    return src(config.src).pipe(dest(config.dest));
  }

  return parallel(processVendorScripts);
}
