import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import modernizr from 'gulp-modernizr';
import { Options as SassOptions } from 'node-sass';

declare namespace gulppress {
  export interface BaseConfig {
    src: string | string[];
    dest: string;
  }

  export interface MainConfig {
    assets? : string | string[];
    project: ProjectConfig;
    browserSync: browserSync.Options;
    scripts: ScriptConfig;
    styles: StylesConfig;
    favicon: FaviconConfig;
    fonts: FontsConfig;
    images: ImagesConfig;
    icons: IconsConfig;
    modernizr: ModernizrConfig;
    translation: TranslationConfig;
  }

  export interface ProjectConfig {
    basePath: string;
    envFile: string | false;
    createSeparateMinFiles: boolean;
    projectURL: string;
    environment: string | false;
  }

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

  export interface FaviconConfig extends BaseConfig {}

  export interface FontsConfig extends BaseConfig {
    srcPath: string;
  }

  export interface IconsConfig extends BaseConfig {}

  export interface ImagesConfig extends BaseConfig {
    destPhpPartials?: string | null | undefined;
  }

  export interface ModernizrConfig extends BaseConfig {
    modernizrOptions: modernizr.Params;
  }

  export interface ScriptConfig extends BaseConfig {
    targets: string | Array<string> | { [key: string]: string };
  }

  export interface StylesConfig extends BaseConfig {
    sassOptions: SassOptions;
    autoprefixerOptions: autoprefixer.Options;
    postcssPlugins: [] | Array<CallableFunction>;
  }

  export interface TranslationConfig extends BaseConfig {
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

  export interface VendorScriptsConfig extends BaseConfig {}
}

export default gulppress;
