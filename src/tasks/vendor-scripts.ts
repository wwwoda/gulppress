import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';

interface VendorScriptsConfig {
  src: string | string[];
  dest: string;
}

export default function (config: VendorScriptsConfig): TaskFunction {
  function processVendorScripts(): NodeJS.ReadWriteStream {
    return src(config.src).pipe(dest(config.dest));
  }

  return parallel(processVendorScripts);
}
