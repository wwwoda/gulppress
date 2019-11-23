import {
  dest,
  parallel,
  src,
  TaskFunction,
} from 'gulp';
import { Configuration } from 'webpack';
import glob from 'glob';
import path from 'path';
import plumber from 'gulp-plumber';
import webpackMerge from 'webpack-merge';
import webpackStream from 'webpack-stream';

import gulpress from '../interfaces';
import { getWatchers, isDevEnv } from '../utils';

const HashAssetsPlugin = require('hash-assets-webpack-plugin');
const named = require('vinyl-named');
const notify = require('gulp-notify');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

export default function (
  config: gulpress.ScriptConfig,
  project: gulpress.ProjectConfig,
): TaskFunction {
  const source: { [key: string]: string } = {};
  if (Array.isArray(config.src)) {
    config.src.forEach((entry: string) => {
      glob.sync(entry).forEach((result: string) => {
        const extension = path.extname(result);
        const file = path.basename(result, extension);
        source[file] = result;
        if (project.createSeparateMinFiles) {
          source[`${file}.min`] = result;
        }
      });
    });
  } else {
    glob.sync(config.src).forEach((result: string) => {
      const extension = path.extname(result);
      const file = path.basename(result, extension);
      source[file] = result;
      if (project.createSeparateMinFiles) {
        source[`${file}.min`] = result;
      }
    });
  }

  const webpackConfig: Configuration = {
    watch: getWatchers().scripts === true,
    output: {
      path: config.dest,
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
                  targets: config.targets,
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

  if (!isDevEnv()) {
    const uglifyJsPluginConfig = project.createSeparateMinFiles ? { include: /\.min\.js$/ } : {};
    webpackConfig.optimization = {
      minimize: true,
      minimizer: [new UglifyJsPlugin(uglifyJsPluginConfig)],
    };
  }

  function compileScripts(): NodeJS.ReadWriteStream {
    return src(config.src)
      .pipe(plumber())
      .pipe(named())
      .pipe(webpackStream(webpackMerge(
        {
          entry: source,
          devtool: isDevEnv() ? 'inline-source-map' : false,
          mode: isDevEnv() ? 'development' : 'production',
        },
        webpackConfig,
      )).on('error', notify))
      .pipe(dest(config.dest));
  }

  return parallel(compileScripts);
}
