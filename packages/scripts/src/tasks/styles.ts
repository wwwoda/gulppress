import chalk from 'chalk';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import {
  dest,
  parallel,
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
  stylesConfig: gulpress.StylesConfig | false | null | undefined,
  baseConfig: gulpress.BaseConfig | false | null | undefined,
): TaskFunction {
  if (!stylesConfig) {
    return parallel(cb => {
      console.log(chalk.red('Styles configuration missing!'));
      cb();
    });
  }

  const autoprefixerOptions = stylesConfig && stylesConfig.autoprefixerOptions;
  const customPostcssPlugins = (stylesConfig && stylesConfig.postcssPlugins) || [];
  const sassOptions = (stylesConfig && stylesConfig.sassOptions) || {
    includePaths: [
      'node_modules',
    ],
    outputStyle: 'expanded',
  };
  const stylesDest = (stylesConfig && stylesConfig.dest) || '';
  const stylesSrc = (stylesConfig && stylesConfig.src) || '';

  const postcssPlugins = [
    autoprefixer(autoprefixerOptions),
    cssVariables({
      preserve: true,
    }),
    postcssCalc(),
    postcssEasingGradients(),
  ];

  function sassErrorHandler(this: any, error: string) {
    sass.logError.call(this, error);
    if (!isDevEnv(baseConfig)) {
      console.log('Aborting styles build task due to error!');
      process.exit(1);
    }
  }

  function compileStyles(): NodeJS.ReadWriteStream {
    if (baseConfig && baseConfig.createSeparateMinFiles === true) {
      return src(stylesSrc)
        .pipe(plumber())
        .pipe(gulpif(isDevEnv(baseConfig), sourcemaps.init()))
        .pipe(
          sass(sassOptions).on('error', sassErrorHandler),
        )
        .pipe(postcss([...postcssPlugins, ...customPostcssPlugins]))
        .pipe(gulpif(isDevEnv(baseConfig), sourcemaps.write({ includeContent: false })))
        .pipe(dest(stylesDest))
        .pipe(filter('**/*.css'))
        .pipe(stream())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulpif(isDevEnv(baseConfig), sourcemaps.init({ loadMaps: true })))
        .pipe(csso())
        .pipe(gulpif(isDevEnv(baseConfig), sourcemaps.write('./')))
        .pipe(dest(stylesDest))
        .pipe(stream());
    }

    return src(stylesSrc)
      .pipe(plumber())
      .pipe(gulpif(isDevEnv(baseConfig), sourcemaps.init()))
      .pipe(
        sass(sassOptions).on('error', sassErrorHandler),
      )
      .pipe(postcss(postcssPlugins))
      .pipe(gulpif(!isDevEnv(baseConfig), csso()))
      .pipe(gulpif(isDevEnv(baseConfig), sourcemaps.write('.')))
      .pipe(dest(stylesDest))
      .pipe(filter('**/*.css'))
      .pipe(stream());
  }

  function bustCache(): NodeJS.ReadWriteStream {
    return src(`${stylesDest}/*.css`)
      .pipe(
        gulpBuster({
          fileName: '.assets.json',
          relativePath: stylesDest,
        }),
      )
      .pipe(dest(stylesDest));
  }

  return series(compileStyles, bustCache);
}
