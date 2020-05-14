
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import glob from 'glob';
import path from 'path';
import { Configuration, Plugin } from 'webpack';

import {
  getWatchers,
  isDevEnv,
} from '../utils';
import gulppress from '../interfaces';

const HashAssetsPlugin = require('hash-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

export class ScriptsHelper {
  private static createSeparateMinFiles: boolean;

  private static isDevelopmentEnvironment: boolean;

  private static isTypechecksEnabled: boolean;

  private static isTypescriptEnabled: boolean;

  private static targets: gulppress.Targets;

  public static init(
    scriptConfig: gulppress.ScriptConfig,
    baseConfig: gulppress.BaseConfig,
  ) {
    ScriptsHelper.createSeparateMinFiles = baseConfig?.createSeparateMinFiles === true;
    ScriptsHelper.isDevelopmentEnvironment = isDevEnv(baseConfig);
    ScriptsHelper.isTypescriptEnabled = scriptConfig.features?.typescript === true;
    ScriptsHelper.isTypechecksEnabled = scriptConfig.features?.typeChecks === true;
    ScriptsHelper.targets = (scriptConfig && scriptConfig.targets) || [
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
  }

  private static getWebpackConfigExtensions(): string[] {
    if (ScriptsHelper.isTypescriptEnabled === true) {
      return ['.js', '.ts', 'json'];
    }
    return ['.js', 'json'];
  }

  private static getWebpackConfigTestValue(): RegExp {
    return ScriptsHelper.isTypescriptEnabled === true ? /\.(ts|js)?$/ : /\.js?$/;
  }

  private static getWebpackConfigPresets(): any {
    const presets: any = [
      [
        '@babel/preset-env',
        {
          targets: ScriptsHelper.targets,
        },
      ],
    ];
    if (ScriptsHelper.isTypescriptEnabled === true) {
      presets.push('@babel/preset-typescript');
    }
    return presets;
  }

  public static getWebpackConfig(scriptSrc: string | string[], scriptDest: string): Configuration {
    const {
      createSeparateMinFiles,
      isDevelopmentEnvironment,
    } = ScriptsHelper;
    const source = ScriptsHelper.getSource(scriptSrc);

    const webpackConfig: Configuration = {
      watch: getWatchers().scripts === true,
      output: {
        path: scriptDest,
        filename: '[name].js',
      },
      module: {
        rules: [{
          test: ScriptsHelper.getWebpackConfigTestValue(),
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ScriptsHelper.getWebpackConfigPresets(),
              plugins: [
                '@babel/proposal-class-properties',
                '@babel/proposal-object-rest-spread',
              ],
            },
          }],
        }],
      },
      resolve: {
        extensions: ScriptsHelper.getWebpackConfigExtensions(),
      },
      externals: {
        jquery: 'jQuery',
      },
      plugins: ScriptsHelper.getWebpackPlugins(),
      cache: {},
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

  private static getWebpackPlugins(): Plugin[] {
    const {
      isTypechecksEnabled,
      isTypescriptEnabled,
    } = ScriptsHelper;
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
        Object.assign(sources, ScriptsHelper.getSourceEntry(entry));
      });
    } else if (scriptSrc) {
      Object.assign(sources, ScriptsHelper.getSourceEntry(scriptSrc));
    }
    return sources;
  }

  private static getSourceEntry(
    entry: string,
  ): { [key: string]: string } {
    const { createSeparateMinFiles } = ScriptsHelper;
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
