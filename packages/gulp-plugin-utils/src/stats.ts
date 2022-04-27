import chalk from 'chalk';
import log from 'fancy-log';
import PluginError from 'plugin-error';
import plur from 'plur';
import type through2 from 'through2';
import type Vinyl from 'vinyl';
import yargs from 'yargs/yargs';
import { extractGlobsFromConfigs } from './config';

export interface Stats {
  total: number;
  matched: number;
  created: number;
  unmatched: number;
  unmatchedBlocked: number;
  unmatchedPassed: number;
  matchedGlobs: string[];
  unmatchedGlobs: string[];
  skippedFiles: Vinyl[];
  passedThroughFiles: Vinyl[];
  incrementTotal: (val?: number) => Stats;
  incrementMatched: (val?: number) => Stats;
  incrementCreated: (val?: number) => Stats;
  incrementUnmatched: (val?: number) => Stats;
  incrementUnmatchedBlocked: (val?: number) => Stats;
  incrementUnmatchedPassed: (val?: number) => Stats;
  markGlobsAsMatched: (globs: string[]) => Stats;
  addSkippedFile: (path: Vinyl) => Stats;
  addPassedThroughFile: (path: Vinyl) => Stats;
}

const baseStates: Stats = {
  total: 0,
  matched: 0,
  created: 0,
  unmatched: 0,
  unmatchedBlocked: 0,
  unmatchedPassed: 0,
  matchedGlobs: [],
  unmatchedGlobs: [],
  skippedFiles: [],
  passedThroughFiles: [],

  incrementTotal(val?: number): Stats {
    this.total = val ? this.total + val : this.total + 1;
    return this;
  },
  incrementMatched(val?: number): Stats {
    this.matched = val ? this.total + val : this.total + 1;
    return this;
  },
  incrementCreated(val?: number): Stats {
    this.created = val ? this.total + val : this.total + 1;
    return this;
  },
  incrementUnmatched(val?: number): Stats {
    this.unmatched = val ? this.total + val : this.total + 1;
    return this;
  },
  incrementUnmatchedBlocked(val?: number): Stats {
    this.unmatchedBlocked = val ? this.total + val : this.total + 1;
    return this;
  },
  incrementUnmatchedPassed(val?: number): Stats {
    this.unmatchedPassed = val ? this.total + val : this.total + 1;
    return this;
  },
  markGlobsAsMatched(globs: string[]): Stats {
    this.matchedGlobs = [...new Set([...this.matchedGlobs, ...globs])];
    this.unmatchedGlobs = this.unmatchedGlobs.filter((glob: string) => !globs.includes(glob));
    return this;
  },
  addSkippedFile(file: Vinyl): Stats {
    this.skippedFiles.push(file);
    return this;
  },
  addPassedThroughFile(file: Vinyl): Stats {
    this.passedThroughFiles.push(file);
    return this;
  },
};

export const createStats = <T>(
  configs: T[] | Record<string, T | T[]>,
): Stats => ({
    ...baseStates,
    unmatchedGlobs: extractGlobsFromConfigs(configs),
  });

export const getFlushFunction = (
  stats: Stats,
  prefix: string,
  silent: boolean,
  showStats: boolean,
  errorOnUnusedConfig: boolean,
  type = 'file',
) => (callback: through2.TransformCallback): void => {
  const { silent: silentArg } = yargs(process.argv.slice(2)).options({
    silent: { type: 'boolean', default: false },
  }).parseSync();

  if (silentArg || silent) {
    callback();
    return;
  }

  showStats && logStats(stats, prefix, type);

  if (stats.unmatchedGlobs.length < 1) {
    callback();
    return;
  }

  const message = `${prefix} => Unmatched globs:${globsToList(stats.unmatchedGlobs)}`;
  if (errorOnUnusedConfig) {
    // eslint-disable-next-line consistent-return
    return callback(new PluginError(prefix, message));
  }
  log(message);

  callback();
};

const logStats = (
  stats: Stats,
  prefix: string,
  type = 'file',
): void => {
  const str = stats.total > 1 ? 'images' : 'image';
  log(`${prefix} => Created ${stats.total} ${plur(type, stats.total)} (matched ${stats.matched} of ${stats.total} ${str})`);
  if (stats.skippedFiles.length > 0) {
    log(`${prefix} => Skipped ${plur(type, stats.skippedFiles.length)} (do not match any configs):${filesToList(stats.skippedFiles)}`);
  }
  if (stats.passedThroughFiles.length > 0) {
    log(`${prefix} => Passed through ${plur(type, stats.passedThroughFiles.length)} (do not match any configs):${filesToList(stats.passedThroughFiles)}`);
  }
};

const globsToList = (globs: string[]): string => {
  if (!globs.length) return '';
  const join = '\n- ';
  const list = globs.map((glob) => chalk.yellow(glob)).join(join);
  return join + list;
};

const filesToList = (files: Vinyl[]): string => {
  if (!files.length) return '';
  const join = '\n- ';
  const list = files.map((file) => chalk.blue(file.relative)).join(join);
  return join + list;
};
