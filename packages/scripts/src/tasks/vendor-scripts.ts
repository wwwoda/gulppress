import fs from 'fs';
import {
  dest,
  series,
  src,
  TaskFunction,
} from 'gulp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import path from 'path';
import saveLicense from 'uglify-save-license';

import gulpress from '../interfaces';
import { isDevEnv } from '../utils';

export default function (
  vendorScriptsConfig: gulpress.VendorScriptsConfig,
  baseConfig: gulpress.BaseConfig,
): TaskFunction {
  const vendorSources: string[] = [];
  const vendorVersions: {} = {};

  function processVendorScriptsConfig(cb: CallableFunction) {
    vendorScriptsConfig.packages.forEach(vendorScript => {
      const packagePath = path.resolve(process.cwd(), './node_modules', `./${vendorScript}`);
      try {
        if (fs.statSync(packagePath).isFile()) {
          vendorSources.push(packagePath);
        } else if (fs.statSync(packagePath).isDirectory()) {
          const packageJsonPath = path.resolve(packagePath, './package.json');
          if (fs.statSync(packageJsonPath).isFile()) {
            // eslint-disable-next-line global-require, import/no-dynamic-require
            const pkg = require(packageJsonPath);
            const main = pkg.main.endsWith('.js') ? pkg.main : `${pkg.main}.js`;
            const srcPath = path.resolve(packagePath, main);
            if (fs.statSync(srcPath).isFile()) {
              vendorSources.push(srcPath);
              vendorVersions[path.basename(srcPath)] = pkg.version;
              if (baseConfig.createSeparateMinFiles === true) {
                vendorVersions[`${path.basename(srcPath)}.min`] = pkg.version;
              }
            }
          }
        }
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.error(`Error processing vendor package: no such file or directory, stat '${error.path}'`);
        } else {
          console.error('Error processing vendor package');
          console.log(error);
        }
      }
    });
    return cb();
  }

  function processVendorScripts(cb: CallableFunction): NodeJS.ReadWriteStream | null {
    if (vendorSources.length < 1) {
      cb();
      return null;
    }

    if (baseConfig.createSeparateMinFiles === true) {
      return src(vendorSources)
        .pipe(dest(vendorScriptsConfig.dest))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({
          output: {
            comments: saveLicense,
          },
        }))
        .pipe(dest(vendorScriptsConfig.dest));
    }

    return src(vendorSources)
      .pipe(gulpif(!isDevEnv(baseConfig), uglify({
        output: {
          comments: saveLicense,
        },
      })))
      .pipe(dest(vendorScriptsConfig.dest));
  }

  function createVendorScriptsVersionFile(cb: CallableFunction) {
    if (vendorSources.length > 0 && vendorVersions !== {}) {
      const content = JSON.stringify(vendorVersions, null, 2);
      const filePath = path.resolve(vendorScriptsConfig.dest, './.assets.json');
      try {
        fs.writeFileSync(filePath, content);
      } catch (error) {
        console.log(error);
      }
    }
    cb();
  }

  return series(processVendorScriptsConfig, processVendorScripts, createVendorScriptsVersionFile);
}
