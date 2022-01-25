import type { Transform } from 'stream';
import PluginError from 'plugin-error';
import * as through2 from 'through2';
import type Vinyl from 'vinyl';
import type { BufferFile } from 'vinyl';
import {
  createFile,
  createStats,
  defaultOptions as defaultOptionsBase,
  filterMatchingConfigs,
  getFilePath,
  getFlushFunction,
  Stats,
} from '@gulppress/gulp-plugin-utils';
import type {
  FontConfig,
  FontFactoryConfigs,
  FontFactoryOptions,
} from './types';
import { getWriteFormats } from './format';
import { createFontPromise } from './font';

const defaultOptions = {
  ...defaultOptionsBase,
  passThroughMatched: false,
  passThroughUnmatched: false,
};

export * from './types';

export default (
  configs: FontFactoryConfigs,
  customOptions?: FontFactoryOptions,
): Transform => {
  const stats = createStats<FontConfig>(configs);
  const options = {
    name: '@gulppress/gulp-font-factory',
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
    'font',
  ));
};

const getPromises = (
  transform: Transform,
  file: BufferFile,
  configs: FontConfig[],
  stats: Stats,
): Array<Promise<void>> => configs.flatMap((config: FontConfig) => {
  const toFormats = getWriteFormats(file, config);
  const fonts = toFormats.map(
    (toFormat) => [
      createFontPromise(file, config, toFormat),
      toFormat,
    ] as const,
  );
  const filePath = getFilePath(file, config.rename || {});
  stats.incrementTotal(fonts.length);
  return fonts.map((combo) => {
    const [promise, format] = combo;
    return promise.then((input) => {
      if (input === null) {
        return;
      }
      transform.push(createFile(
        file,
        input,
        format,
        filePath,
      ));
    });
  });
});
