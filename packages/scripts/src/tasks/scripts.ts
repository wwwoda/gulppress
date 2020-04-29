import chalk from 'chalk';
import { reload } from 'browser-sync';
import fancyLog from 'fancy-log';
import forkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import glob from 'glob';
import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
import path from 'path';
import plumber from 'gulp-plumber';
import { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackStream from 'webpack-stream';

import gulpress from '../interfaces';
import { getWatchers, isDevEnv } from '../utils';

const named = require('vinyl-named');
const hashAssetsPlugin = require('hash-assets-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');

export default function (
  scriptConfig: gulpress.ScriptConfig | false | null | undefined,
  baseConfig: gulpress.BaseConfig | false | null | undefined,
): TaskFunction {
  if (!scriptConfig) {
    return parallel(cb => {
      console.log(chalk.red('Scripts configuration missing!'));
      cb();
    });
  }

  const scriptSrc = (scriptConfig && scriptConfig.src) || '';
  const scriptDest = (scriptConfig && scriptConfig.dest) || '';
  const targets = (scriptConfig && scriptConfig.targets) || [
    '> 1%',
    'ie >= 11',
    'last 1 Android versions',
    'last 1 ChromeAndroid versions',
    'last 2 Chrome versions',
    'last 2 Firefox versions',
    'last 2 Safari versions',
    'last 2 iOS versions',
    'last 2 Edge versions',
    'last 2 Opera versions',
  ];

  const source: { [key: string]: string } = {};

  if (Array.isArray(scriptSrc)) {
    scriptSrc.forEach((entry: string) => {
      glob.sync(entry).forEach((result: string) => {
        const extension = path.extname(result);
        const file = path.basename(result, extension);
        source[file] = result;
        if (baseConfig && baseConfig.createSeparateMinFiles === true) {
          source[`${file}.min`] = result;
        }
      });
    });
  } else if (scriptSrc) {
    glob.sync(scriptSrc).forEach((result: string) => {
      const extension = path.extname(result);
      const file = path.basename(result, extension);
      source[file] = result;
      if (baseConfig && baseConfig.createSeparateMinFiles === true) {
        source[`${file}.min`] = result;
      }
    });
  }

  const webpackConfig: Configuration = {
    watch: getWatchers().scripts === true,
    output: {
      path: scriptDest,
      filename: '[name].js',
    },
    module: {
      rules: [{
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets,
                },
              ],
              '@babel/preset-typescript',
            ],
            plugins: [
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
            ],
          },
        },
      }],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    externals: {
      jquery: 'jQuery',
    },
    plugins: [
      new forkTsCheckerWebpackPlugin(),
      new hashAssetsPlugin({
        filename: '.assets.json',
        keyTemplate: (filename: string): string|null => {
          const match = /^(.*)\.(?!\.)(.*)$/.exec(filename);
          if (match) {
            return `${match[1]}.${match[2]}`;
          }
          return null;
        },
        prettyPrint: true,
      }),
    ],
    cache: {},
  };

  if (!isDevEnv(baseConfig)) {
    const uglifyJsPluginConfig = baseConfig && baseConfig.createSeparateMinFiles === true ? { include: /\.min\.js$/ } : {};
    webpackConfig.optimization = {
      minimize: true,
      minimizer: [new uglifyJsPlugin(uglifyJsPluginConfig)],
    };
  }

  function compileScripts(): NodeJS.ReadWriteStream {
    return src(scriptSrc)
      .pipe(plumber())
      .pipe(named())
      .pipe(webpackStream(webpackMerge(
        {
          entry: Object.entries(source).length >= 1 ? source : '',
          devtool: isDevEnv(baseConfig) ? 'inline-source-map' : false,
          mode: isDevEnv(baseConfig) ? 'development' : 'production',
        },
        webpackConfig,
      ), undefined, () => {
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
