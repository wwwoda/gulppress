import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';

const sort = require('gulp-sort');
const wpPot = require('gulp-wp-pot');

interface TranslateConfig {
  src: string | string[];
  dest: string;
  filename: string;
  options: {
    textDomain: string;
    packageName: string;
    bugReport: string;
    lastTranslator: string;
    team: string;
  };
}

export default function (config: TranslateConfig): TaskFunction {
  function translate(): NodeJS.ReadWriteStream {
    return src(config.src)
      .pipe(sort())
      .pipe(
        wpPot({
          domain: config.options.textDomain,
          package: config.options.packageName,
          bugReport: config.options.bugReport,
          lastTranslator: config.options.lastTranslator,
          team: config.options.team,
        }),
      )
      .pipe(dest(`${config.dest}/${config.filename}`));
  }

  return parallel(translate);
}
