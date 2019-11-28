import {
  dest,
  series,
  src,
  TaskFunction,
} from 'gulp';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
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
  config: gulpress.StylesConfig,
  project: gulpress.ProjectConfig,
): TaskFunction {
  const postcssPlugins = [
    autoprefixer(config.autoprefixerOptions),
    cssVariables({
      preserve: true,
    }),
    postcssCalc(),
    postcssEasingGradients(),
  ];

  function compileStyles(): NodeJS.ReadWriteStream {
    if (project.createSeparateMinFiles === true) {
      return src(config.src)
        .pipe(plumber())
        .pipe(gulpif(isDevEnv(), sourcemaps.init()))
        .pipe(
          sass(config.sassOptions).on('error', sass.logError),
        )
        .pipe(postcss([...postcssPlugins, ...config.postcssPlugins]))
        .pipe(gulpif(isDevEnv(), sourcemaps.write({ includeContent: false })))
        .pipe(dest(config.dest))
        .pipe(filter('**/*.css'))
        .pipe(stream())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulpif(isDevEnv(), sourcemaps.init({ loadMaps: true })))
        .pipe(csso())
        .pipe(gulpif(isDevEnv(), sourcemaps.write('./')))
        .pipe(dest(config.dest))
        .pipe(stream());
    }

    return src(config.src)
      .pipe(plumber())
      .pipe(gulpif(isDevEnv(), sourcemaps.init()))
      .pipe(
        sass(config.sassOptions).on('error', sass.logError),
      )
      .pipe(postcss(postcssPlugins))
      .pipe(gulpif(!isDevEnv(), csso()))
      .pipe(gulpif(isDevEnv(), sourcemaps.write('.')))
      .pipe(dest(config.dest))
      .pipe(filter('**/*.css'))
      .pipe(stream());
  }

  function bustCache(): NodeJS.ReadWriteStream {
    return src(`${config.dest}/*.css`)
      .pipe(
        gulpBuster({
          fileName: '.assets.json',
          relativePath: config.dest,
        }),
      )
      .pipe(dest(config.dest));
  }

  return series(compileStyles, bustCache);
}
