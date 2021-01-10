import {
  Globs,
  TaskFunction,
  dest,
  src,
} from 'gulp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import readPkg from 'read-pkg-up';

import { VendorPackages } from '../../classes/vendorPackages';
import * as gulppress from '../../types';
import { isDevEnv } from '../../utils';

const saveLicense = require('uglify-save-license');


export function compileVendorScriptsTask(
  dirname: string,
  globs: Globs | gulppress.GlobsFunction,
  folder: string,
): TaskFunction {
  return () => (compileVendorScriptsStream(dirname, globs, folder));
}

export function compileVendorScriptsStream(
  dirname: string,
  globs?: Globs | gulppress.GlobsFunction,
  folder?: string,
): NodeJS.ReadWriteStream {
  if (typeof globs === 'function') {
    // eslint-disable-next-line no-param-reassign
    globs = globs();
  }
  if (!globs || globs.length < 1 || !folder) {
    return src('./', { allowEmpty: true });
  }
  return src(globs, { base: dirname })
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
