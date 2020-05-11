import chalk from 'chalk';
import {
  dest,
  parallel,
  series,
  src,
  TaskFunction,
} from 'gulp';
import changed from 'gulp-changed';
import filter from 'gulp-filter';

import gulpress from '../interfaces';

const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

export default function (config: gulpress.FontsConfig | false | null | undefined): TaskFunction {
  if (!config) {
    return parallel(cb => {
      console.log(chalk.red('Fonts configuration missing!'));
      cb();
    });
  }

  const fontsDest = (config && config.dest) || '';
  const fontsSrc = (config && config.src) || '';
  const fontsSrcPath = (config && config.srcPath) || '';

  function createWoffFromTtf(): NodeJS.ReadWriteStream {
    return src(fontsSrc, { allowEmpty: true })
      .pipe(filter(file => /ttf$/.test(file.path)))
      .pipe(ttf2woff())
      .pipe(dest(fontsSrcPath));
  }

  function createWoff2FromTtf(): NodeJS.ReadWriteStream {
    return src(fontsSrc, { allowEmpty: true })
      .pipe(filter(file => /ttf$/.test(file.path)))
      .pipe(ttf2woff2())
      .pipe(dest(fontsSrcPath));
  }

  function copyFonts(): NodeJS.ReadWriteStream {
    return src(fontsSrc, { allowEmpty: true })
      .pipe(filter(file => /(woff|woff2)$/.test(file.path)))
      .pipe(changed(fontsDest))
      .pipe(dest(fontsDest));
  }

  return series(parallel(createWoffFromTtf, createWoff2FromTtf), copyFonts);
}
