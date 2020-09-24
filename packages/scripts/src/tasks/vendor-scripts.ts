import chalk from 'chalk';
import fs from 'fs';
import {
  dest,
  parallel,
  series,
  src,
  TaskFunction,
} from 'gulp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import path from 'path';

import gulpress from '../interfaces';
import { isDevEnv } from '../utils';

const saveLicense = require('uglify-save-license');

export default function (
  vendorScriptsConfig: gulpress.VendorScriptsConfig | null | undefined,
  baseConfig: gulpress.BaseConfig,
): TaskFunction {
  if (!vendorScriptsConfig) {
    return parallel(cb => {
      console.log(chalk.red('Vendor scripts configuration missing!'));
      cb();
    });
  }

  const packages = (vendorScriptsConfig && vendorScriptsConfig.packages) || [];
  const vendorDest = (vendorScriptsConfig && vendorScriptsConfig.dest) || '';
  const createSeparateMinFiles = (baseConfig && baseConfig.createSeparateMinFiles) || false;
  const vendorSources: string[] = [];
  const vendorVersions: { [key: string]: string } = {};

  function processVendorScriptsConfig(cb: CallableFunction) {
    packages.forEach(vendorScript => {
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
              if (baseConfig && baseConfig.createSeparateMinFiles === true) {
                vendorVersions[`${path.basename(srcPath)}.min`] = pkg.version;
              }
            }
          }
        }
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log(chalk.red(`Error processing vendor package: no such file or directory, stat '${error.path}'`));
        } else {
          console.log(chalk.red('Error processing vendor package'));
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

    if (createSeparateMinFiles === true) {
      return src(vendorSources, { allowEmpty: true })
        .pipe(dest(vendorDest))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({
          output: {
            comments: saveLicense,
          },
        }))
        .pipe(dest(vendorDest));
    }

    return src(vendorSources, { allowEmpty: true })
      .pipe(gulpif(!isDevEnv(), uglify({
        output: {
          comments: saveLicense,
        },
      })))
      .pipe(dest(vendorDest));
  }

  function createVendorScriptsVersionFile(cb: CallableFunction) {
    if (vendorDest && vendorSources.length > 0 && vendorVersions !== {}) {
      const content = JSON.stringify(vendorVersions, null, 2);
      const filePath = path.resolve(vendorDest, './.assets.json');
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
