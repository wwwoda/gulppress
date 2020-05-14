import chalk from 'chalk';
import { reload } from 'browser-sync';
import fancyLog from 'fancy-log';
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import glob from 'glob';
import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
// import path from 'path';
import plumber from 'gulp-plumber';
// import { Configuration, RuleSetQuery } from 'webpack';
// import webpackMerge from 'webpack-merge';
import webpackStream from 'webpack-stream';

import { ScriptsHelper } from '../module/scripts';
import gulpress from '../interfaces';
import {
  getWatchers,
  isDevEnv,
  getConfigSource,
  getConfigDestination,
} from '../utils';

const named = require('vinyl-named');
// const HashAssetsPlugin = require('hash-assets-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

export default function (
  scriptConfig: gulpress.ScriptConfig | null | undefined,
  baseConfig: gulpress.BaseConfig,
): TaskFunction {
  if (!scriptConfig) {
    return parallel(cb => {
      console.log(chalk.red('Scripts configuration missing!'));
      cb();
    });
  }

  const scriptSrc = getConfigSource(scriptConfig);
  const scriptDest = getConfigDestination(scriptConfig);
  // const targets = ;
  // const source: { [key: string]: string } = {};
  // const createSeparateMinFiles = baseConfig?.createSeparateMinFiles === true;
  ScriptsHelper.init(scriptConfig, baseConfig);
  // const source = ScriptsHelper.getSource(scriptSrc);
  const webpackConfig = ScriptsHelper.getWebpackConfig(scriptSrc, scriptDest);

  // if (Array.isArray(scriptSrc)) {
  //   scriptSrc.forEach((entry: string) => {
  //     glob.sync(entry).forEach((result: string) => {
  //       const extension = path.extname(result);
  //       const file = path.basename(result, extension);
  //       source[file] = result;
  //       if (baseConfig && baseConfig.createSeparateMinFiles === true) {
  //         source[`${file}.min`] = result;
  //       }
  //     });
  //   });
  // } else if (scriptSrc) {
  //   glob.sync(scriptSrc).forEach((result: string) => {
  //     const extension = path.extname(result);
  //     const file = path.basename(result, extension);
  //     source[file] = result;
  //     if (baseConfig && baseConfig.createSeparateMinFiles === true) {
  //       source[`${file}.min`] = result;
  //     }
  //   });
  // }

  // const isTypescriptEnabled = scriptConfig.features?.typescript;
  // const ruleSetTest = isTypescriptEnabled === true ? /\.(ts|js)?$/ : /\.js?$/;
  // const ruleSetPresets: RuleSetQuery = [
  //   [
  //     '@babel/preset-env',
  //     {
  //       targets,
  //     },
  //   ],
  // ];

  // if (isTypescriptEnabled === true) {
  //   ruleSetPresets.push('@babel/preset-typescript');
  // }

  // const webpackConfig: Configuration = {
  //   watch: getWatchers().scripts === true,
  //   output: {
  //     path: scriptDest,
  //     filename: '[name].js',
  //   },
  //   module: {
  //     rules: [{
  //       test: ruleSetTest,
  //       exclude: /node_modules/,
  //       use: [{
  //         loader: 'babel-loader',
  //         options: {
  //           presets: [
  //             [
  //               '@babel/preset-env',
  //               {
  //                 targets,
  //               },
  //             ],
  //           ],
  //           plugins: [
  //             '@babel/proposal-class-properties',
  //             '@babel/proposal-object-rest-spread',
  //           ],
  //         },
  //       }],
  //     }],
  //   },
  //   resolve: {
  //     extensions: ['.js', '.ts', '.jsx', '.tsx'],
  //   },
  //   externals: {
  //     jquery: 'jQuery',
  //   },
  //   plugins: [
  //     new HashAssetsPlugin({
  //       filename: '.assets.json',
  //       keyTemplate: (filename: string): string|null => {
  //         const match = /^(.*)\.(?!\.)(.*)$/.exec(filename);
  //         if (match) {
  //           return `${match[1]}.${match[2]}`;
  //         }
  //         return null;
  //       },
  //       prettyPrint: true,
  //     }),
  //   ],
  //   cache: {},
  // };

  // if (isTypescriptEnabled === true && scriptConfig.features?.typeChecks === true) {
  //   // eslint-disable-next-line no-unused-expressions
  //   webpackConfig.plugins?.push(new ForkTsCheckerWebpackPlugin());
  // }

  // if (!isDevEnv(baseConfig)) {
  //   const uglifyJsPluginConfig = baseConfig && baseConfig.createSeparateMinFiles === true ?
  // { include: /\.min\.js$/ } : {};
  //   webpackConfig.optimization = {
  //     minimize: true,
  //     minimizer: [new UglifyJsPlugin(uglifyJsPluginConfig)],
  //   };
  // }

  function compileScripts(): NodeJS.ReadWriteStream {
    return src(scriptSrc, { allowEmpty: true })
      .pipe(plumber())
      .pipe(named())
      .pipe(webpackStream(webpackConfig, undefined, () => {
      // .pipe(webpackStream(webpackMerge(
      //   {
      //     entry: Object.entries(source).length >= 1 ? source : '',
      //     devtool: isDevEnv(baseConfig) ? 'inline-source-map' : false,
      //     mode: isDevEnv(baseConfig) ? 'development' : 'production',
      //   },
      //   webpackConfig,
      // ), undefined, () => {
        if (getWatchers().scripts === true) {
          reload();
        }
      }).on('error', (error: Error) => {
        fancyLog.error(error.message);
        if (!isDevEnv(baseConfig)) {
          console.log('Aborting scripts build task due to error!');
          process.exit(1);
        }
      }))
      .pipe(dest(scriptDest));
  }

  return parallel(compileScripts);
}
