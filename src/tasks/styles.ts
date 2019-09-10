import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import csso from 'gulp-csso';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcssCalc from 'postcss-calc';
import { getWatchers, isDev } from '../utils';

const gulpBuster = require('gulp-buster');
const cssVariables = require('postcss-css-variables');
const postcssEasingGradients = require('postcss-easing-gradients');

interface StylesCompilerConfig {
  src: string | string[];
  dest: string;
  includePaths: string[];
}

const { stream } = browserSync;

export default function (config: StylesCompilerConfig): TaskFunction {
  const postcssPlugins = [
    autoprefixer({}),
    cssVariables({
      preserve: true,
    }),
    postcssCalc(),
    postcssEasingGradients(),
  ];

  function compileStyles(): NodeJS.ReadWriteStream {
    return src(config.src)
      .pipe(plumber())
      .pipe(gulpif(isDev(), sourcemaps.init()))
      .pipe(
        sass({
          outputStyle: 'expanded',
          includePaths: config.includePaths,
        }).on('error', sass.logError),
      )
      .pipe(postcss(postcssPlugins))
      .pipe(gulpif(!isDev(), csso()))
      .pipe(gulpif(isDev(), sourcemaps.write('.')))
      .pipe(dest(config.dest))
      .pipe(gulpif(getWatchers().styles === true, stream()))
      .pipe(
        gulpBuster({
          fileName: '.assets.json',
          relativePath: config.dest,
        }),
      )
      .pipe(dest(config.dest));
  }

  return parallel(compileStyles);
}
