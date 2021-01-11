import path from 'path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import glob from 'glob';
import { Globs } from 'gulp';
import { Configuration } from 'webpack';

import * as gulppress from '../types';
import {
  getWatchers,
  isDevEnv,
} from '../utils';

const HashAssetsPlugin = require('hash-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

export class WebpackConfig {
  private static createSeparateMinFiles: boolean;

  private static isDevelopmentEnvironment: boolean;

  private static isTypechecksEnabled: boolean;

  private static isTypescriptEnabled: boolean;

  private static presetTargets: gulppress.PresetTargets;

  public static init(
    typescript: boolean = true,
    typechecks: boolean = true,
    presetTargets: gulppress.PresetTargets = '> 0.25%, not dead',
    createSeparateMinFiles: boolean = false,
  ) {
    WebpackConfig.createSeparateMinFiles = createSeparateMinFiles;
    WebpackConfig.isDevelopmentEnvironment = isDevEnv();
    WebpackConfig.isTypescriptEnabled = typescript;
    WebpackConfig.isTypechecksEnabled = typechecks;
    WebpackConfig.presetTargets = presetTargets;
  }

  private static getWebpackConfigExtensions(): string[] {
    if (WebpackConfig.isTypescriptEnabled === true) {
      return ['.js', '.ts', 'json'];
    }
    return ['.js', 'json'];
  }

  private static getWebpackConfigTestValue(): RegExp {
    return WebpackConfig.isTypescriptEnabled === true ? /\.(ts|js)?$/ : /\.js?$/;
  }

  private static getWebpackConfigPresets(): any {
    const presets: any = [
      [
        '@babel/preset-env',
        {
          targets: WebpackConfig.presetTargets,
        },
      ],
    ];
    if (WebpackConfig.isTypescriptEnabled === true) {
      presets.push('@babel/preset-typescript');
    }
    return presets;
  }

  public static getWebpackConfig(srcGlobs: Globs, destFolder: string): Configuration {
    const {
      createSeparateMinFiles,
      isDevelopmentEnvironment,
    } = WebpackConfig;
    const source = WebpackConfig.getSource(srcGlobs);

    const webpackConfig: Configuration = {
      watch: getWatchers().scripts === true,
      output: {
        path: destFolder,
        filename: '[name].js',
      },
      module: {
        rules: [{
          test: WebpackConfig.getWebpackConfigTestValue(),
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: WebpackConfig.getWebpackConfigPresets(),
              plugins: [
                '@babel/proposal-class-properties',
                '@babel/proposal-object-rest-spread',
              ],
            },
          }],
        }],
      },
      resolve: {
        extensions: WebpackConfig.getWebpackConfigExtensions(),
      },
      externals: {
        jquery: 'jQuery',
      },
      plugins: WebpackConfig.getWebpackPlugins(),
      entry: Object.entries(source).length >= 1 ? source : '',
      devtool: isDevelopmentEnvironment ? 'inline-source-map' : false,
      mode: isDevelopmentEnvironment ? 'development' : 'production',
    };

    if (!isDevelopmentEnvironment) {
      const uglifyJsPluginConfig = createSeparateMinFiles === true ? { include: /\.min\.js$/ } : {};
      webpackConfig.optimization = {
        minimize: true,
        minimizer: [new UglifyJsPlugin(uglifyJsPluginConfig)],
      };
    }

    return webpackConfig;
  }

  private static getWebpackPlugins(): any[] {
    const {
      isTypechecksEnabled,
      isTypescriptEnabled,
    } = WebpackConfig;
    const plugins = [
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
    ];
    if (isTypescriptEnabled && isTypechecksEnabled) {
      plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return plugins;
  }

  public static getSource(
    scriptSrc: string | string[],
  ): { [key: string]: string } {
    const sources: { [key: string]: string } = {};
    if (Array.isArray(scriptSrc)) {
      scriptSrc.forEach((entry: string) => {
        Object.assign(sources, WebpackConfig.getSourceEntry(entry));
      });
    } else if (scriptSrc) {
      Object.assign(sources, WebpackConfig.getSourceEntry(scriptSrc));
    }
    return sources;
  }

  private static getSourceEntry(
    entry: string,
  ): { [key: string]: string } {
    const { createSeparateMinFiles } = WebpackConfig;
    const source: { [key: string]: string } = {};
    glob.sync(entry).forEach((result: string) => {
      const extension = path.extname(result);
      const file = path.basename(result, extension);
      source[file] = result;
      if (createSeparateMinFiles === true) {
        source[`${file}.min`] = result;
      }
    });
    return source;
  }
}
