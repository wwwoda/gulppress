import browserSync from 'browser-sync';
import chalk from 'chalk';
import fancyLog from 'fancy-log';
import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';
import csso from 'gulp-csso';
import filter from 'gulp-filter';
import gulpif from 'gulp-if';
// import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import { Options as SassOptions } from 'node-sass';

import { inProductionEnv } from '../../utils';

const { stream } = browserSync;

export function compileStylesTask(
  globs: Globs,
  destFolder: string,
  sassOptions: SassOptions | undefined,
  postcssPlugins: any[] | undefined,
  createSeparateMinFiles: boolean = false,
  notifications: boolean = false,
): TaskFunction {
  return () => {
    if (createSeparateMinFiles === true) {
      return compileStylesWithMinFileStream(globs, destFolder, sassOptions, postcssPlugins, notifications);
    }
    return compileStylesWithoutMinFileStream(globs, destFolder, sassOptions, postcssPlugins, notifications);
  };
}

export function compileStylesWithoutMinFileStream(
  srcGlobs: Globs,
  destFolder: string,
  sassOptions: SassOptions | undefined,
  postcssPlugins: any[] | undefined,
  _notifications: boolean = false,
): NodeJS.ReadWriteStream {
  return src(srcGlobs, { allowEmpty: true })
    .pipe(plumber())
    .pipe(gulpif(!inProductionEnv(), sourcemaps.init()))
    .pipe(
      sass(sassOptions).on('error', onSassError),
    )
    .pipe(postcss(postcssPlugins))
    .on('error', onPostCSSError)
    .pipe(gulpif(inProductionEnv(), csso()))
    .pipe(gulpif(!inProductionEnv(), sourcemaps.write('.')))
    .pipe(dest(destFolder))
    .pipe(filter('**/*.css'))
    .pipe(stream());
}

export function compileStylesWithMinFileStream(
  srcGlobs: Globs,
  destFolder: string,
  sassOptions: SassOptions | undefined,
  postcssPlugins: any[] | undefined,
  _notifications: boolean = false,
): NodeJS.ReadWriteStream {
  return src(srcGlobs, { allowEmpty: true })
    .pipe(plumber())
    .pipe(gulpif(!inProductionEnv(), sourcemaps.init()))
    .pipe(
      sass(sassOptions).on('error', onSassError),
    )
    .pipe(postcss(postcssPlugins))
    .on('error', onPostCSSError)
    .pipe(gulpif(!inProductionEnv(), sourcemaps.write({ includeContent: false })))
    .pipe(dest(destFolder))
    .pipe(filter('**/*.css'))
    .pipe(stream())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpif(!inProductionEnv(), sourcemaps.init({ loadMaps: true })))
    .pipe(csso())
    .pipe(gulpif(!inProductionEnv(), sourcemaps.write('./')))
    .pipe(dest(destFolder))
    .pipe(stream());
}

function onSassError(this: any, error: string) {
  sass.logError.call(this, error);
  if (inProductionEnv()) {
    console.log('Aborting styles build task due to error SASS compilation error!');
    process.exit(1);
  }
}

function onPostCSSError(this: any, error: any) {
  console.log(error);

  fancyLog.error(chalk.red(`PostCSS compilation error: ${error.message}`));
  if (inProductionEnv()) {
    console.log('Aborting styles build task due to error PostCSS compilation error!');
    process.exit(1);
  }
  this.emit('end');
}
