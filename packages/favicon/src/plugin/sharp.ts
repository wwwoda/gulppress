import type { Transform } from 'stream';
import PluginError from 'plugin-error';
import sharp, { Sharp } from 'sharp';
import * as through from 'through2';
import Vinyl, { BufferFile } from 'vinyl';
import rename from 'rename';
import path from 'path';
import picomatch from 'picomatch';
import type { SharpConfig } from '../types';

type Configs = SharpConfig[] | Record<string, SharpConfig | SharpConfig[]>;

const resizeFavicon = (conf: Configs): Transform => through.obj(function (
  file: Vinyl,
  // eslint-disable-next-line no-undef
  _encoding: BufferEncoding,
  callback: through.TransformCallback,
): void {
  if (file.isNull()) {
    callback(null, file);
    return;
  }

  if (file.isStream()) {
    callback(new PluginError('gulpppress-favicon', 'Streaming not supported'));
    return;
  }

  if (!file.isBuffer()) {
    callback(new PluginError('gulpppress-favicon', 'Expected file to be a buffer.'));
  }

  const promises: Array<Promise<void | BufferFile>> = [];

  filterConfigs(file, conf).forEach((config) => {
    const sharpInstance: Sharp = createSharp(file as BufferFile, config);

    // eslint-disable-next-line arrow-body-style
    promises.push(sharpInstance.toBuffer().then((buffer: Buffer) => {
      this.push(new Vinyl({
        cwd: file.cwd,
        base: file.base,
        path: getFilePath(file, config),
        contents: buffer,
      }));
    }));
  });

  Promise.all(promises).then((): void => {
    callback();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, (err: any): void => {
    callback(new PluginError('gulpppress-favicon', err, { message: 'Error while transforming file' }));
  });
});

const getFilePath = (
  file: Vinyl,
  config: SharpConfig,
): string => (
  config.rename
    ? path.join(file.base, rename(file.relative, config.rename).toString())
    : file.path
);

const createSharp = (file: BufferFile, config: SharpConfig): Sharp => {
  const image = sharp(file.contents, {});

  if (config.resize) {
    image.resize(null, null, config.resize);
  }

  if (config.format) {
    image.toFormat(config.format, config.formatOptions || {});
  }

  return image;
};

const filterConfigs = (file: Vinyl, configs: Configs): SharpConfig[] => {
  if (Array.isArray(configs)) {
    return configs;
  }
  const matchedConfigs: SharpConfig[] = [];
  Object.keys(configs).forEach((glob: string) => {
    if (!isMatch(file, glob)) return;

    const config = configs[glob];
    matchedConfigs.push(...(Array.isArray(config) ? config : [config]));
  });
  return matchedConfigs;
};

const isMatch = (file: Vinyl, glob: string): boolean => {
  const options = glob.includes('/') ? {} : { basename: true };
  return picomatch.isMatch(file.path, glob, options);
};

export default resizeFavicon;
