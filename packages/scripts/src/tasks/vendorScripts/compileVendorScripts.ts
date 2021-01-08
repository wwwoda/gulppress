import {
  dest,
  src,
  Globs,
  TaskFunction,
} from 'gulp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import readPkg from 'read-pkg-up';
import { VendorPackages } from '../../classes/vendorPackages';

import gulppress from '../../interfaces';
import { isDevEnv } from '../../utils';

const saveLicense = require('uglify-save-license');


export function getCompileVendorScriptsTask(
  globs: Globs | gulppress.GlobsFunction,
  folder: string,
): TaskFunction {
  return (cb: CallableFunction) => (getCompileVendorScriptsStream(cb, globs, folder));
}

export function getCompileVendorScriptsStream(
  cb: CallableFunction,
  globs?: Globs | gulppress.GlobsFunction,
  folder?: string,
): NodeJS.ReadWriteStream {
  if (typeof globs === 'function') {
    // eslint-disable-next-line no-param-reassign
    globs = globs();
  }
  if (!globs || globs.length < 1 || !folder) {
    return cb();
  }
  return src(globs, { base: process.cwd() })
    .pipe(gulpif(!isDevEnv(), uglify({
      output: {
        comments: saveLicense,
      },
    })))
    .pipe(rename(path => {
      const { basename, extname } = path;
      if (!path.dirname?.includes('node_modules') || basename !== 'index') {
        return {
          dirname: '',
          basename,
          extname,
        };
      }
      const pkg = readPkg.sync({
        cwd: path.dirname,
        normalize: false,
      });
      if (!pkg?.packageJson.name) {
        return {
          dirname: '',
          basename,
          extname,
        };
      }
      return {
        dirname: '',
        basename: VendorPackages.getBaseName(basename, pkg?.packageJson.name),
        extname,
      };
    }))
    .pipe(dest(folder));
}
