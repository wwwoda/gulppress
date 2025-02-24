import picomatch from 'picomatch';
import type { Transform } from 'stream';
import PluginError from 'plugin-error';
import chalk from 'chalk';
// import log from 'fancy-log';
import type Vinyl from 'vinyl';
import type { Stats } from './stats';
import type { FactoryOptions } from './types';
import { defaultOptions } from './options';

export const filterMatchingConfigs = <Config>(
  transform: Transform,
  file: Vinyl,
  configs: Config[] | Record<string, Config | Config[]>,
  stats: Stats,
  customOptions: FactoryOptions,
): Config[] | PluginError | null => {
  const options = {
    ...defaultOptions,
    ...customOptions,
  };
  stats.incrementTotal();

  const matchedConfigs = getMatchingConfigsForFile<Config>(file, configs, stats);

  if (matchedConfigs.length === 0) {
    return handleUnmatchedFile(transform, file, stats, options);
  }

  if (options.passThroughMatched) {
    transform.push(file);
  }

  stats.incrementMatched();

  return matchedConfigs;
};

export const handleUnmatchedFile = (
  transform: Transform,
  file: Vinyl,
  stats: Stats,
  customOptions: FactoryOptions,
): PluginError | null => {
  const options = {
    ...defaultOptions,
    ...customOptions,
  };
  stats.incrementUnmatched();
  const message = `${chalk.blue(file.relative)} (does not match any config)`;
  if (options.errorOnUnmatchedFile) {
    return new PluginError(options.name, message);
  }
  if (options.passThroughUnmatched) {
    transform.push(file);
    stats.incrementUnmatchedPassed();
    if (!options.silent) {
      stats.addPassedThroughFile(file);
      // log(`${options.name} => pass through without changes: ${message}`);
    }
    return null;
  }
  stats.incrementUnmatchedBlocked();
  if (!options.silent) {
    // log(`${options.name} => skip for processing: ${message}`);
    stats.addSkippedFile(file);
  }
  return null;
};

export const getMatchingConfigsForFile = <T>(
  file: Vinyl,
  configs: T[] | Record<string, T | T[]>,
  stats: Stats,
): T[] => {
  if (Array.isArray(configs)) {
    return configs;
  }
  const matchedConfigs: T[] = [];
  const globs: string[] = [];
  Object.keys(configs).forEach((glob: string) => {
    if (!isMatch(file, glob)) return;
    globs.push(glob);
    const config = configs[glob];
    if (!config) {
      return;
    }
    matchedConfigs.push(...(Array.isArray(config) ? config : [config]));
  });
  stats.markGlobsAsMatched(globs);
  return matchedConfigs;
};

export const isMatch = (file: Vinyl, glob: string): boolean => {
  const options = glob.includes('/') ? {} : { basename: true };
  return picomatch.isMatch(file.path, glob, options);
};

export const extractGlobsFromConfigs = <T>(
  configs: T[] | Record<string, T | T[]>,
): string[] => (Array.isArray(configs) ? [] : Object.keys(configs));
