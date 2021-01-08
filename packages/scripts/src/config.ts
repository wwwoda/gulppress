/* eslint-disable
  global-require,
  import/no-dynamic-require,
  import/no-extraneous-dependencies
*/
import chalk from 'chalk';
import { resolve } from 'path';

import gulppress from './interfaces';

export const getLocalConfig = (path: string): gulppress.ProjectConfig => {
  try {
    return require(path);
  } catch (e) {
    return {};
  }
};

export const getMainConfig = (path: string): gulppress.ProjectConfig => {
  let config: gulppress.ProjectConfig;
  try {
    config = require(path);
  } catch (e) {
    console.error(`${chalk.bgRed.white('Stopping GulpPress')} \
${chalk.red(`Main config not found at "${path}"`)}`);
    process.exit(1);
  }
  return config;
};

export const getConfig = (
  dirname: string,
  mainConfigPath: string,
  localConfigPath?: string,
): gulppress.ProjectConfig => {
  const mainConfig = getMainConfig(resolve(dirname, mainConfigPath));
  const localConfig = localConfigPath ? getLocalConfig(resolve(dirname, localConfigPath)) : {};
  return { ...mainConfig, ...localConfig };
};
