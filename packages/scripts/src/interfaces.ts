import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import { Options as SassOptions } from 'node-sass';

declare namespace gulppress {
  export interface BasicTaskConfig {
    src: string | string[];
    dest: string;
  }

  export interface ProjectConfig {
    assets? : string | string[] | null;
    base?: BaseConfig | null;
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
    environment?: 'development' | 'staging' | 'production';
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
      destPhpPartials: string;
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
    sizes?: Array<number | {size: number, rename: string}>;
  }

  export interface FontsConfig extends BasicTaskConfig {
    srcPath: string;
  }

  export interface IconsConfig extends BasicTaskConfig {
    destPhpPartials?: string | null | undefined;
  }

  export interface ImagesConfig extends BasicTaskConfig {
    destPhpPartials?: string | null | undefined;
  }

  export interface ScriptConfig extends BasicTaskConfig {
    watch: string | Array<string>;
    targets: string | Array<string> | { [key: string]: string };
  }

  export interface StylesConfig extends BasicTaskConfig {
    watch: string | Array<string>;
    sassOptions: SassOptions;
    autoprefixerOptions: autoprefixer.Options;
    postcssPlugins: [] | Array<CallableFunction>;
  }

  export interface TranslationConfig extends BasicTaskConfig {
    wpPotOptions: {
      bugReport?: string;
      commentKeyword?: string;
      domain?: string;
      headers?: { [key: string]: string } | boolean;
      gettextFunctions?: { [key: string]: string };
      lastTranslator?: string;
      metadataFile?: string;
      noFilePaths?: boolean;
      package?: string;
      relativeTo?: string;
      globOpts?: { [key: string]: string };
      team?: string;
      ignoreTemplateNameHeader?: boolean;
    };
  }

  export interface VendorScriptsConfig {
    packages: Array<string>;
    dest: string;
  }
}

export default gulppress;
