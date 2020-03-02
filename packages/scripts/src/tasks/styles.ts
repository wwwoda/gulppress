import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import {
  dest,
  series,
  src,
  TaskFunction,
} from 'gulp';
import csso from 'gulp-csso';
import filter from 'gulp-filter';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcssCalc from 'postcss-calc';

import gulpress from '../interfaces';
import { isDevEnv } from '../utils';

const gulpBuster = require('gulp-buster');
const cssVariables = require('postcss-css-variables');
const postcssEasingGradients = require('postcss-easing-gradients');

const { stream } = browserSync;

export default function (
  stylesConfig: gulpress.StylesConfig,
  baseConfig: gulpress.BaseConfig,
): TaskFunction {
  const postcssPlugins = [
    autoprefixer(stylesConfig.autoprefixerOptions),
    cssVariables({
      preserve: true,
    }),
    postcssCalc(),
    postcssEasingGradients(),
  ];

  function sassErrorHandler(this: any, error: Error) {
    sass.logError.call(this, error);
    if (!isDevEnv(baseConfig)) {
      console.log('Aborting styles build task due to error!');
      process.exit(1);
    }
  }

  function compileStyles(): NodeJS.ReadWriteStream {
    if (baseConfig.createSeparateMinFiles === true) {
      return src(stylesConfig.src)
        .pipe(plumber())
        .pipe(gulpif(isDevEnv(baseConfig), sourcemaps.init()))
        .pipe(
          sass(stylesConfig.sassOptions).on('error', sassErrorHandler),
        )
        .pipe(postcss([...postcssPlugins, ...stylesConfig.postcssPlugins]))
        .pipe(gulpif(isDevEnv(baseConfig), sourcemaps.write({ includeContent: false })))
        .pipe(dest(stylesConfig.dest))
        .pipe(filter('**/*.css'))
        .pipe(stream())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulpif(isDevEnv(baseConfig), sourcemaps.init({ loadMaps: true })))
        .pipe(csso())
        .pipe(gulpif(isDevEnv(baseConfig), sourcemaps.write('./')))
        .pipe(dest(stylesConfig.dest))
        .pipe(stream());
    }

    return src(stylesConfig.src)
      .pipe(plumber())
      .pipe(gulpif(isDevEnv(baseConfig), sourcemaps.init()))
      .pipe(
        sass(stylesConfig.sassOptions).on('error', sassErrorHandler),
      )
      .pipe(postcss(postcssPlugins))
      .pipe(gulpif(!isDevEnv(baseConfig), csso()))
      .pipe(gulpif(isDevEnv(baseConfig), sourcemaps.write('.')))
      .pipe(dest(stylesConfig.dest))
      .pipe(filter('**/*.css'))
      .pipe(stream());
  }

  function bustCache(): NodeJS.ReadWriteStream {
    return src(`${stylesConfig.dest}/*.css`)
      .pipe(
        gulpBuster({
          fileName: '.assets.json',
          relativePath: stylesConfig.dest,
        }),
      )
      .pipe(dest(stylesConfig.dest));
  }

  return series(compileStyles, bustCache);
}
