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

export default function (config: gulpress.FontsConfig): TaskFunction {
  function createWoffFromTtf(): NodeJS.ReadWriteStream {
    return src(config.src)
      .pipe(filter(file => /ttf$/.test(file.path)))
      .pipe(ttf2woff())
      .pipe(dest(config.srcPath));
  }

  function createWoff2FromTtf(): NodeJS.ReadWriteStream {
    return src(config.src)
      .pipe(filter(file => /ttf$/.test(file.path)))
      .pipe(ttf2woff2())
      .pipe(dest(config.srcPath));
  }

  function copyFonts(): NodeJS.ReadWriteStream {
    return src(config.src)
      .pipe(filter(file => /(woff|woff2)$/.test(file.path)))
      .pipe(changed(config.dest))
      .pipe(dest(config.dest));
  }

  return series(parallel(createWoffFromTtf, createWoff2FromTtf), copyFonts);
}
