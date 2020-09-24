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

import gulpress from '../interfaces';
import { isDevEnv } from '../utils';

const gulpBuster = require('gulp-buster');

const { stream } = browserSync;

export default function (
  stylesConfig: gulpress.StylesConfig | null | undefined,
  baseConfig: gulpress.BaseConfig,
): TaskFunction {
  if (!stylesConfig) {
    return parallel(cb => {
      console.log(chalk.red('Styles configuration missing!'));
      cb();
    });
  }

  const autoprefixerOptions = stylesConfig && stylesConfig.autoprefixerOptions;
  const postcssPlugins = (stylesConfig && stylesConfig.postcssPlugins) || [];
  const sassOptions = (stylesConfig && stylesConfig.sassOptions) || {
    includePaths: [
      'node_modules',
    ],
    outputStyle: 'expanded',
  };
  const stylesDest = (stylesConfig && stylesConfig.dest) || '';
  const stylesSrc = (stylesConfig && stylesConfig.src) || '';

  function sassErrorHandler(this: any, error: string) {
    sass.logError.call(this, error);
    if (!isDevEnv()) {
      console.log('Aborting styles build task due to error!');
      process.exit(1);
    }
  }

  function compileStyles(): NodeJS.ReadWriteStream {
    if (baseConfig && baseConfig.createSeparateMinFiles === true) {
      return src(stylesSrc, { allowEmpty: true })
        .pipe(plumber())
        .pipe(gulpif(isDevEnv(), sourcemaps.init()))
        .pipe(
          sass(sassOptions).on('error', sassErrorHandler),
        )
        .pipe(postcss([...postcssPlugins, autoprefixer(autoprefixerOptions)]))
        .pipe(gulpif(isDevEnv(), sourcemaps.write({ includeContent: false })))
        .pipe(dest(stylesDest))
        .pipe(filter('**/*.css'))
        .pipe(stream())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulpif(isDevEnv(), sourcemaps.init({ loadMaps: true })))
        .pipe(csso())
        .pipe(gulpif(isDevEnv(), sourcemaps.write('./')))
        .pipe(dest(stylesDest))
        .pipe(stream());
    }

    return src(stylesSrc, { allowEmpty: true })
      .pipe(plumber())
      .pipe(gulpif(isDevEnv(), sourcemaps.init()))
      .pipe(
        sass(sassOptions).on('error', sassErrorHandler),
      )
      .pipe(postcss([...postcssPlugins, autoprefixer(autoprefixerOptions)]))
      .pipe(gulpif(!isDevEnv(), csso()))
      .pipe(gulpif(isDevEnv(), sourcemaps.write('.')))
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
