import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import modernizr from 'gulp-modernizr';
import { Options as SassOptions } from 'node-sass';
declare namespace gulpPress {
    type AssetItemType = string | {
        dest: string;
    };
    interface BaseConfig {
        src: string | string[];
        dest: string;
    }
    interface MainConfig {
        basePath: string;
        useDotEnv: string | false | undefined | null;
        createSeparateDotMinFiles: boolean;
        projectURL: string;
        browserSyncOptions: browserSync.Options;
        environment: string | false | undefined | null;
        scripts: ScriptConfig;
        styles: StylesConfig;
        favicon: FaviconConfig;
        fonts: FontsConfig;
        images: ImagesConfig;
        icons: IconsConfig;
        modernizr: ModernizrConfig;
        translation: TranslationConfig;
    }
    interface CleanConfig {
        assets?: string | string[];
        favicon?: AssetItemType;
        fonts?: AssetItemType;
        icons?: AssetItemType;
        images?: AssetItemType;
        scripts?: AssetItemType;
        styles?: AssetItemType;
    }
    interface FaviconConfig extends BaseConfig {
    }
    interface FontsConfig extends BaseConfig {
        srcPath: string;
    }
    interface IconsConfig extends BaseConfig {
    }
    interface ImagesConfig extends BaseConfig {
        phpPartialsDest?: string | null | undefined;
    }
    interface ModernizrConfig extends BaseConfig {
        options: modernizr.Params;
    }
    interface ScriptConfig extends BaseConfig {
        targets: string | Array<string> | {
            [key: string]: string;
        };
    }
    interface StylesConfig extends BaseConfig {
        sassOptions: SassOptions;
        autoprefixerOptions: autoprefixer.Options;
    }
    interface TranslationConfig extends BaseConfig {
        filename: string;
        options: {
            textDomain: string;
            packageName: string;
            bugReport: string;
            lastTranslator: string;
            team: string;
        };
    }
    interface VendorScriptsConfig extends BaseConfig {
    }
}
export = gulpPress;
