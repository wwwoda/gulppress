import chalk from 'chalk';
import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';

import gulpress from '../interfaces';

const sort = require('gulp-sort');
const wpPot = require('gulp-wp-pot');

export default function (
  config: gulpress.TranslationConfig | false | null | undefined,
): TaskFunction {
  if (!config) {
    return parallel(cb => {
      console.log(chalk.red('Translation configuration missing!'));
      cb();
    });
  }

  const configWpPotOptions = (config && config.wpPotOptions) || '';
  const translationDest = (config && config.dest) || '';
  const translationSrc = (config && config.src) || '';

  function translate(): NodeJS.ReadWriteStream {
    return src(translationSrc, { allowEmpty: true })
      .pipe(sort())
      .pipe(
        wpPot(configWpPotOptions),
      )
      .pipe(dest(`${translationDest}`));
  }

  return parallel(translate);
}
