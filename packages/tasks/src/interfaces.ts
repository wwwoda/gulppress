import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import modernizr from 'gulp-modernizr';
import { Options as SassOptions } from 'node-sass';

declare namespace gulppress {
  type AssetItemType = string | {
    dest: string;
  };

  interface BaseConfig {
    src: string | string[];
    dest: string;
  }

  interface MainConfig {
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

  interface ProjectConfig {
    basePath: string;
    envFile: string | false;
    createSeparateMinFiles: boolean;
    projectURL: string;
    environment: string | false;
  }

  interface CleanConfig {
    assets? : string | string[];
    favicon? : AssetItemType;
    fonts? : AssetItemType;
    icons? : AssetItemType;
    images? : string | {
      dest: string;
      destPhpPartials: string;
    };
    scripts? : AssetItemType;
    styles? : AssetItemType;
  }

  interface FaviconConfig extends BaseConfig {}

  interface FontsConfig extends BaseConfig {
    srcPath: string;
  }

  interface IconsConfig extends BaseConfig {}

  interface ImagesConfig extends BaseConfig {
    destPhpPartials?: string | null | undefined;
  }

  interface ModernizrConfig extends BaseConfig {
    modernizrOptions: modernizr.Params;
  }

  interface ScriptConfig extends BaseConfig {
    targets: string | Array<string> | { [key: string]: string };
  }

  interface StylesConfig extends BaseConfig {
    sassOptions: SassOptions;
    autoprefixerOptions: autoprefixer.Options;
    postcssPlugins: [] | Array<CallableFunction>;
  }

  interface TranslationConfig extends BaseConfig {
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

  interface VendorScriptsConfig extends BaseConfig {}
}

export default gulppress;
