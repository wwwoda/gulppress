import { reload } from 'browser-sync';
import fancyLog from 'fancy-log';
import glob from 'glob';
import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
import plumber from 'gulp-plumber';
import path from 'path';
import { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackStream from 'webpack-stream';

import gulpress from '../interfaces';
import { getWatchers, isDevEnv } from '../utils';

const HashAssetsPlugin = require('hash-assets-webpack-plugin');
const named = require('vinyl-named');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

export default function (
  scriptConfig: gulpress.ScriptConfig,
  baseConfig: gulpress.BaseConfig,
): TaskFunction {
  const source: { [key: string]: string } = {};
  if (Array.isArray(scriptConfig.src)) {
    scriptConfig.src.forEach((entry: string) => {
      glob.sync(entry).forEach((result: string) => {
        const extension = path.extname(result);
        const file = path.basename(result, extension);
        source[file] = result;
        if (baseConfig.createSeparateMinFiles === true) {
          source[`${file}.min`] = result;
        }
      });
    });
  } else {
    glob.sync(scriptConfig.src).forEach((result: string) => {
      const extension = path.extname(result);
      const file = path.basename(result, extension);
      source[file] = result;
      if (baseConfig.createSeparateMinFiles === true) {
        source[`${file}.min`] = result;
      }
    });
  }

  const webpackConfig: Configuration = {
    watch: getWatchers().scripts === true,
    output: {
      path: scriptConfig.dest,
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
                  targets: scriptConfig.targets,
                },
              ],
              '@babel/typescript',
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
      new HashAssetsPlugin({
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
    const uglifyJsPluginConfig = baseConfig.createSeparateMinFiles === true ? { include: /\.min\.js$/ } : {};
    webpackConfig.optimization = {
      minimize: true,
      minimizer: [new UglifyJsPlugin(uglifyJsPluginConfig)],
    };
  }

  function compileScripts(): NodeJS.ReadWriteStream {
    return src(scriptConfig.src)
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
      .pipe(dest(scriptConfig.dest));
  }

  return parallel(compileScripts);
}
