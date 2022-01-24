import type { Transform } from 'stream';
import PluginError from 'plugin-error';
import type sharp from 'sharp';
import * as through2 from 'through2';
import type Vinyl from 'vinyl';
import type { BufferFile } from 'vinyl';
import {
  createFile,
  createStats,
  defaultOptions,
  filterMatchingConfigs,
  getFilePath,
  getFlushFunction,
  Stats,
} from '@gulppress/gulp-plugin-utils';
import type {
  ImageFormat,
  ImageFactoryConfigs,
  ImageFactoryOptions,
  SharpConfig,
} from './types';
import { createSharp } from './sharp';
import { getFormatsFromConfig } from './format';

export * from './types';

export default (
  configs: ImageFactoryConfigs,
  customOptions?: ImageFactoryOptions,
): Transform => {
  const stats = createStats<SharpConfig>(configs);
  const options = {
    name: '@gulppress/gulp-image-factory',
    ...defaultOptions,
    ...customOptions,
  };

  const { name } = options;

  return through2.obj(function (
    file: Vinyl,
    // eslint-disable-next-line no-undef
    _encoding: BufferEncoding,
    callback: through2.TransformCallback,
  ): void {
    if (file.isNull()) {
      callback(null, file);
      return;
    }

    if (file.isStream()) {
      callback(new PluginError(name, 'Streaming not supported'));
      return;
    }

    if (!file.isBuffer()) {
      callback(new PluginError(name, 'Expected file to be a buffer.'));
    }

    const bufferFile = file as BufferFile;

    const matchingConfigs = filterMatchingConfigs(
      this,
      bufferFile,
      configs,
      stats,
      options,
    );

    if (!Array.isArray(matchingConfigs)) {
      callback(matchingConfigs);
      return;
    }

    const promises: Array<Promise<void | Buffer>> = getPromises(
      this,
      bufferFile,
      matchingConfigs,
      stats,
    );

    Promise.all(promises).then((): void => {
      callback();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, (err: any): void => {
      callback(new PluginError(name, err, { message: 'Error while transforming file' }));
    });
  }, getFlushFunction(
    stats,
    name,
    options.silent,
    options.stats,
    options.errorOnUnusedConfig,
    'image',
  ));
};

const getPromises = (
  transform: Transform,
  file: BufferFile,
  configs: SharpConfig[],
  stats: Stats,
): Array<Promise<void | Buffer>> => configs.flatMap((config: SharpConfig) => {
  const toFormats = getFormatsFromConfig(file, config);
  const images: Array<[sharp.Sharp, ImageFormat]> = toFormats.map((format) => {
    const image = createSharp(file, config, format);
    return [image, format];
  });
  const filePath = getFilePath(file, config.rename || {});
  stats.incrementTotal(images.length);
  return images.map((combo) => {
    const [image, format] = combo;
    return image.toBuffer().then((buffer: Buffer) => {
      transform.push(createFile(
        file,
        buffer,
        format,
        filePath,
      ));
      return buffer;
    });
  });
});
