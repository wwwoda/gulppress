import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import { Globs } from 'gulp';
import imagemin from 'gulp-imagemin';
import { Options as GifsicleOptions } from 'imagemin-gifsicle';
import { Options as MozjpegOptions } from 'imagemin-mozjpeg';
import { Options as OptipngOptions } from 'imagemin-optipng';
import { Options as SvgoOptions } from 'imagemin-svgo';
import { Options as SassOptions } from 'node-sass';
import { Configuration as WebpackConfiguration } from 'webpack';

export type GlobsFunction = () => Globs;

export type FaviconSizes = Array<number | {size: number, rename: string}>;
export interface BasicTaskConfig {
  src: Globs;
  dest: string;
}

export interface LocalConfig {
  assets? : string | string[];
  browserList?: string | Array<string> | IndexedObject;
  browserSync?: browserSync.Options
  scripts?: ScriptConfig;
  styles?: StylesConfig;
  favicon?: FaviconConfig;
  fonts?: FontsConfig;
  images?: ImagesConfig;
  icons?: IconsConfig;
  translation?: TranslationConfig;
  vendorScripts?: VendorScriptsConfig;
  [key: string]: any;
}

export interface MainConfig extends LocalConfig {
  base: BaseConfig;
}

export interface BaseConfig {
  dirname: string,
  envFile?: string | false;
  createSeparateMinFiles?: boolean;
}

export interface BrowserSyncConfig extends browserSync.Options {}

export interface CleanConfig {
  assets? : string | string[];
  favicon? : string | {
    dest: string;
  };
  fonts? : string | {
    dest: string;
  };
  icons? : string | {
    dest: string;
  };
  images? : string | {
    dest: string;
    destPhpPartials?: string;
  };
  scripts? : string | {
    dest: string;
  };
  styles? : string | {
    dest: string;
  };
}

export interface FaviconConfig extends BasicTaskConfig {
  color?: string;
  sizes?: FaviconSizes;
  imagemin?: ImageMin;
}

export interface FontsConfig extends BasicTaskConfig {
  srcFolder: string;
}

export interface IconsConfig extends BasicTaskConfig {
  destPhpPartials?: string | null | undefined;
  imagemin?: ImageMin;
}

export interface ImagesConfig extends BasicTaskConfig {
  destPhpPartials?: string | null | undefined;
  imagemin?: ImageMin;
}

export interface ScriptConfig extends BasicTaskConfig {
  webpackConfig?: WebpackConfiguration;
  watch?: string | Array<string>;
  targets?: PresetTargets;
  features?: {
    typescript?: boolean;
    typeChecks?: boolean;
  };
}

export interface StylesConfig extends BasicTaskConfig {
  watch?: string | Array<string>;
  sassOptions?: SassOptions;
  autoprefixerOptions?: autoprefixer.Options;
  postcssPlugins?: any[];
}

export interface TranslationConfig extends BasicTaskConfig {
  wpPotOptions?: WpPotOptions;
}

export interface VendorScriptsConfig {
  src?: Globs;
  packages?: string[];
  dest: string;
}

export type PresetTargets = string | Array<string> | IndexedObject;

export interface IndexedObject {
  [key: string]: string
}

export interface WpPotOptions {
  bugReport?: string;
  commentKeyword?: string;
  domain?: string;
  headers?: IndexedObject | boolean;
  gettextFunctions?: IndexedObject;
  lastTranslator?: string;
  metadataFile?: string;
  noFilePaths?: boolean;
  package?: string;
  relativeTo?: string;
  globOpts?: IndexedObject;
  team?: string;
  ignoreTemplateNameHeader?: boolean;
}

export interface ImageMin {
  options?: imagemin.Options;
  gifsicle?: GifsicleOptions;
  mozjpeg?: MozjpegOptions;
  optipng?: OptipngOptions;
  svgo?: SvgoOptions;
}

export interface WatchersStatus {
  icons?: boolean;
  images?: boolean;
  scripts?: boolean;
  styles?: boolean;
}
