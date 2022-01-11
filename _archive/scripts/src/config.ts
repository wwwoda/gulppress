/* eslint-disable
  global-require,
  import/no-dynamic-require,
  import/no-extraneous-dependencies
*/
import { existsSync } from 'fs';
import { relative, resolve } from 'path';

import chalk from 'chalk';

import { LocalConfig, MainConfig } from './types';

export function getLocalConfig(path: string): LocalConfig {
  try {
    return require(path);
  } catch (e) {
    return {};
  }
}

export function getMainConfig(path: string): MainConfig {
  let config: MainConfig;
  try {
    config = require(path);
  } catch (e) {
    console.error(`${chalk.bgRed.white('Stopping GulpPress')} \
${chalk.red(`Main config not found at "${path}"`)}`);
    process.exit(1);
  }
  return config;
}

export function getConfig(
  dirname: string,
  mainConfigPath: string,
  localConfigPath?: string,
): MainConfig {
  const mainConfig = getMainConfig(resolve(dirname, mainConfigPath));
  const localConfig = localConfigPath ? getLocalConfig(resolve(dirname, localConfigPath)) : {};
  const config = { ...mainConfig, ...localConfig };
  const { base, scripts, styles } = config;
  // Make sure the scripts dest path is absolute
  if (scripts && scripts.dest) {
    scripts.dest = resolve(base.dirname, scripts.dest);
  }
  // Make sure the styles dest path is relative to the current path
  if (styles && styles.dest) {
    styles.dest = relative(base.dirname, styles.dest);
  }
  loadEnv(base.dirname, base.envFile);
  return config;
}

export function loadEnv(dirname: string, envFile?: string | false): void {
  if (envFile) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodeEnvFile = require('node-env-file');
    try {
      const envPath = resolve(dirname, envFile);
      if (existsSync(envPath)) {
        nodeEnvFile(envPath, { raise: false });
      }
    } catch (err) {
      console.error(chalk.bgRed('.env file not found, please check your configuration'));
    }
  }
}
