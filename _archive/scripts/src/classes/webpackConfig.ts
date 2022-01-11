// import path from 'path';

// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import { sync } from 'glob';
// import { Globs } from 'gulp';
// // import { Configuration, Compiler, WebpackPluginInstance } from 'webpack';
// import { Configuration, WebpackPluginInstance } from 'webpack';

// import * as gulppress from '../types';
// import {
//   getWatchers,
//   isDevEnv,
// } from '../utils';

// const HashAssetsPlugin = require('hash-assets-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// export class WebpackConfig {
//   private static createSeparateMinFiles: boolean;

//   private static isDevEnv: boolean;

//   private static isTypechecksEnabled: boolean;

//   private static isTypescriptEnabled: boolean;

//   private static presetTargets: gulppress.PresetTargets;

//   public static init(
//     typescript: boolean = true,
//     typechecks: boolean = true,
//     presetTargets: gulppress.PresetTargets = '> 0.25%, not dead',
//     createSeparateMinFiles: boolean = false,
//   ) {
//     WebpackConfig.createSeparateMinFiles = createSeparateMinFiles;
//     WebpackConfig.isDevEnv = isDevEnv();
//     WebpackConfig.isTypescriptEnabled = typescript;
//     WebpackConfig.isTypechecksEnabled = typechecks;
//     WebpackConfig.presetTargets = presetTargets;
//   }

//   public static getWebpackConfig(srcGlobs: Globs, destFolder: string): Configuration {
//     const {
//       createSeparateMinFiles,
//       isDevEnv,
//     } = WebpackConfig;
//     const source = globsToEntryPoints(srcGlobs, true);

//     const webpackConfig: Configuration = {
//       watch: getWatchers().scripts === true,
//       output: {
//         path: destFolder,
//         filename: '[name].js',
//       },
//       module: {
//         rules: [{
//           test: WebpackConfig.getWebpackConfigTestValue(),
//           exclude: /node_modules/,
//           use: [{
//             loader: 'babel-loader',
//             options: {
//               presets: WebpackConfig.getWebpackConfigPresets(),
//               plugins: [
//                 '@babel/proposal-class-properties',
//                 '@babel/proposal-object-rest-spread',
//               ],
//             },
//           }],
//         }],
//       },
//       resolve: {
//         extensions: WebpackConfig.getWebpackConfigExtensions(),
//       },
//       externals: {
//         jquery: 'jQuery',
//       },
//       plugins: WebpackConfig.getWebpackPlugins(),
//       entry: Object.entries(source).length >= 1 ? source : '',
//       devtool: isDevEnv ? 'inline-source-map' : false,
//       mode: isDevEnv ? 'development' : 'production',
//     };

//     if (!isDevEnv) {
//       const uglifyJsPluginConfig = createSeparateMinFiles === true ? { include: /\.min\.js$/ } : {};
//       webpackConfig.optimization = {
//         minimize: true,
//         minimizer: [new UglifyJsPlugin(uglifyJsPluginConfig)],
//       };
//     }

//     return webpackConfig;
//   }

//   public static getWebpackConfigExtensions(): string[] {
//     if (WebpackConfig.isTypescriptEnabled === true) {
//       return ['.js', '.ts', 'json'];
//     }
//     return ['.js', 'json'];
//   }

//   public static getWebpackConfigTestValue(): RegExp {
//     return WebpackConfig.isTypescriptEnabled === true ? /\.(ts|js)?$/ : /\.js?$/;
//   }

//   public static getWebpackConfigPresets(): any {
//     const presets: any = [
//       [
//         '@babel/preset-env',
//         {
//           targets: WebpackConfig.presetTargets,
//         },
//       ],
//     ];
//     if (WebpackConfig.isTypescriptEnabled === true) {
//       presets.push('@babel/preset-typescript');
//     }
//     return presets;
//   }

//   public static getWebpackPlugins(): any[] {
//     const {
//       isTypechecksEnabled,
//       isTypescriptEnabled,
//     } = WebpackConfig;
//     const plugins = [
//       new HashAssetsPlugin({
//         filename: '.assets.json',
//         keyTemplate: (filename: string): string|null => {
//           const match = /^(.*)\.(?!\.)(.*)$/.exec(filename);
//           if (match) {
//             return `${match[1]}.${match[2]}`;
//           }
//           return null;
//         },
//         prettyPrint: true,
//       }),
//     ];
//     if (isTypescriptEnabled && isTypechecksEnabled) {
//       plugins.push(new ForkTsCheckerWebpackPlugin());
//     }

//     return plugins;
//   }
// }

// type Features = (
//   'typescript'
//   | 'typechecks'
// )[];

// function createWebpackConfig(
//   globs: Globs,
//   outputPath: string,
//   watch: boolean,
//   features: Features,
//   babelPresets: gulppress.PresetTargets = '> 0.25%, not dead',
//   babelPlugins: string[] = [],
//   configOverrides: Configuration,
//   withMinVersion: boolean = false,
// ): Configuration {
//   return Object.assign({
//     mode: isDevEnv() ? 'development' : 'production',
//     entry: globsToEntryPoints(globs),
//     watch,
//     output: {
//       path: outputPath,
//       filename: '[name].js',
//     },
//     module: {
//       rules: [{
//         test: WebpackConfig.getWebpackConfigTestValue(),
//         exclude: /node_modules/,
//         use: [{
//           loader: 'babel-loader',
//           options: {
//             presets: getBabelLoaderPresets(features, babelPresets),
//             plugins: getBabelLoaderPlugins(babelPlugins),
//           },
//         }],
//       }],
//     },
//     resolve: {
//       extensions: WebpackConfig.getWebpackConfigExtensions(),
//     },
//     externals: {
//       jquery: 'jQuery',
//     },
//     plugins: WebpackConfig.getWebpackPlugins(),
//     devtool: isDevEnv() ? 'inline-source-map' : false,
//     optimization: getOptimizationSettings(withMinVersion),
//   }, configOverrides);
// }

// function getBabelLoaderPlugins(plugins?: string[]) {
//   const defaultPlugins = [
//     '@babel/proposal-class-properties',
//     '@babel/proposal-object-rest-spread',
//   ];
//   if (typeof plugins === 'undefined') {
//     return defaultPlugins;
//   }
//   return [...defaultPlugins, ...plugins];
// }

// function getOptimizationSettings(
//   withMinVersion: boolean = false,
// ): {
//   minimize: boolean;
//   minimizer: WebpackPluginInstance[];
// } | undefined {
//   if (isDevEnv()) {
//     return;
//   }
//   const uglifyJsPluginConfig = withMinVersion === true ? { include: /\.min\.js$/ } : {};
//   return {
//     minimize: true,
//     minimizer: [new UglifyJsPlugin(uglifyJsPluginConfig)],
//   };
// }

// function getBabelLoaderPresets(
//   features: Features,
//   targets: gulppress.PresetTargets,
// ): any[] {
//   const presets: any[] = [
//     [
//       '@babel/preset-env',
//       {
//         targets: targets,
//       },
//     ],
//   ];
//   if (features.includes('typescript')) {
//     presets.push('@babel/preset-typescript');
//   }
//   return presets;
// }

// function globsToEntryPoints(
//   globs: Globs,
//   withMinVersion: boolean = false,
// ): Record<string, string> {
//   if (typeof globs === 'string') {
//     return globToEntryPoints(globs, withMinVersion);
//   }
//   return globs.reduce<Record<string, string>>((entries, glob: string) => Object.assign(entries, globToEntryPoints(glob, withMinVersion)), {});
// }

// function globToEntryPoints(
//   glob: string,
//   withMinVersion: boolean = false,
// ): Record<string, string> {
//   return sync(glob).reduce<Record<string, string>>((entries, filenames: string) => {
//     const extension = path.extname(filenames);
//     const basename = path.basename(filenames, extension);
//     entries[basename] = filenames;
//     if (withMinVersion === true) {
//       entries[`${basename}.min`] = filenames;
//     }
//     return entries;
//   }, {});
// }
