import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import { Options as SassOptions } from 'node-sass';
import { Globs } from 'gulp';

declare namespace gulppress {
  export type GlobsFunction = () => Globs;

  export type FaviconSizes = Array<number | {size: number, rename: string}>;
  export interface BasicTaskConfig {
    src: Globs;
    dest: string;
  }

  export interface ProjectConfig {
    assets? : string | string[] | null;
    base?: BaseConfig;
    browserSync?: browserSync.Options
    scripts?: ScriptConfig | null;
    styles?: StylesConfig | null;
    favicon?: FaviconConfig | null;
    fonts?: FontsConfig | null;
    images?: ImagesConfig | null;
    icons?: IconsConfig | null;
    translation?: TranslationConfig | null;
    vendorScripts?: VendorScriptsConfig | null;
  }

  export interface BaseConfig {
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
  }

  export interface FontsConfig extends BasicTaskConfig {
    srcFolder: string;
  }

  export interface IconsConfig extends BasicTaskConfig {
    destPhpPartials?: string | null | undefined;
  }

  export interface ImagesConfig extends BasicTaskConfig {
    destPhpPartials?: string | null | undefined;
  }

  export interface ScriptConfig extends BasicTaskConfig {
    watch?: string | Array<string>;
    targets?: Targets;
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

  export type Targets = string | Array<string> | IndexedObject;

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
}

export default gulppress;
