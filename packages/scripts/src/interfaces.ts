import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import { Options as SassOptions } from 'node-sass';

declare namespace gulppress {
  export interface BasicTaskConfig {
    src: string | string[];
    dest: string;
  }

  export interface MainConfig {
    assets? : string | string[];
    project: ProjectConfig;
    browserSync: browserSync.Options;
    scripts: ScriptConfig;
    styles: StylesConfig;
    favicon: BasicTaskConfig;
    fonts: FontsConfig;
    images: ImagesConfig;
    icons: IconsConfig;
    translation: TranslationConfig;
  }

  export interface ProjectConfig {
    basePath: string;
    envFile: string | false;
    environment?: 'development' | 'staging' | 'production';
    createSeparateMinFiles: boolean;
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
    targets: string | Array<string> | { [key: string]: string };
  }

  export interface StylesConfig extends BasicTaskConfig {
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
}

export default gulppress;
