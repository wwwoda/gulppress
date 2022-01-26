import chalk from 'chalk';
import log from 'fancy-log';
import type Undertaker from 'undertaker';
import { addDisplayNameToTask } from './task';

export const isSilent = (): boolean => process.argv.includes('--silent');

export const getOnCompleteMessage = (
  name: string,
) => `${isSilent() ? '' : '\n\n'}✅  ==> ${chalk.green(name.toUpperCase())} completed${isSilent() ? '' : '\n'}`;

export const getSuccessLogger = (name: string) => addDisplayNameToTask(
  `${name}:success`,
  (done: Undertaker.TaskCallback) => {
    log(getOnCompleteMessage(name));
    done();
  },
);

export const logError = (error: Error): void => {
  log(error);
};
