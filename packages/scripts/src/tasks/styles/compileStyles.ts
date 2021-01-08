import chalk from 'chalk';
import browserSync from 'browser-sync';
import {
  dest,
  Globs,
  src,
} from 'gulp';
import csso from 'gulp-csso';
import fancyLog from 'fancy-log';
import filter from 'gulp-filter';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import { Options as SassOptions } from 'node-sass';

import { isDevEnv } from '../../utils';

const { stream } = browserSync;

export function getCompileStylesTask(
  globs: Globs,
  folder: string,
  sassOptions: SassOptions | undefined,
  postcssPlugins: any[] | undefined,
  createSeparateMinFiles: boolean = false,
) {
  return (): NodeJS.ReadWriteStream => {
    if (createSeparateMinFiles === true) {
      return (getCompileStylesWithMinFileTask(globs, folder, sassOptions, postcssPlugins))();
    }
    return (getCompileStylesWithoutMinFileTask(globs, folder, sassOptions, postcssPlugins))();
  };
}

export function getCompileStylesWithoutMinFileTask(
  globs: Globs,
  folder: string,
  sassOptions: SassOptions | undefined,
  postcssPlugins: any[] | undefined,
) {
  return (): NodeJS.ReadWriteStream => src(globs, { allowEmpty: true })
    .pipe(plumber())
    .pipe(gulpif(isDevEnv(), sourcemaps.init()))
    .pipe(
      sass(sassOptions).on('error', onSassError),
    )
    .pipe(postcss(postcssPlugins))
    .on('error', onPostCSSError)
    .pipe(gulpif(!isDevEnv(), csso()))
    .pipe(gulpif(isDevEnv(), sourcemaps.write('.')))
    .pipe(dest(folder))
    .pipe(filter('**/*.css'))
    .pipe(stream());
}

export function getCompileStylesWithMinFileTask(
  globs: Globs,
  folder: string,
  sassOptions: SassOptions | undefined,
  postcssPlugins: any[] | undefined,
) {
  return (): NodeJS.ReadWriteStream => src(globs, { allowEmpty: true })
    .pipe(plumber())
    .pipe(gulpif(isDevEnv(), sourcemaps.init()))
    .pipe(
      sass(sassOptions).on('error', onSassError),
    )
    .pipe(postcss(postcssPlugins))
    .on('error', onPostCSSError)
    .pipe(gulpif(isDevEnv(), sourcemaps.write({ includeContent: false })))
    .pipe(dest(folder))
    .pipe(filter('**/*.css'))
    .pipe(stream())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpif(isDevEnv(), sourcemaps.init({ loadMaps: true })))
    .pipe(csso())
    .pipe(gulpif(isDevEnv(), sourcemaps.write('./')))
    .pipe(dest(folder))
    .pipe(stream());
}

function onSassError(this: any, error: string) {
  sass.logError.call(this, error);
  if (!isDevEnv()) {
    console.log('Aborting styles build task due to error SASS compilation error!');
    process.exit(1);
  }
}

function onPostCSSError(this: any, error: any) {
  fancyLog.error(chalk.red(`PostCSS compilation error: ${error.message}`));
  if (!isDevEnv()) {
    console.log('Aborting styles build task due to error PostCSS compilation error!');
    process.exit(1);
  }
  this.emit('end');
}
