import browserSync from 'browser-sync';
import { Globs } from 'gulp';
import imagemin from 'gulp-imagemin';
import { Options as GifsicleOptions } from 'imagemin-gifsicle';
import { Options as MozjpegOptions } from 'imagemin-mozjpeg';
import { Options as OptipngOptions } from 'imagemin-optipng';
import { Options as SvgoOptions } from 'imagemin-svgo';
import { Options as SassOptions } from 'node-sass';
export declare type GlobsFunction = () => Globs;
export declare type FaviconSize = number | {
    size: number;
    rename: string;
};
export interface BasicTaskConfig {
    src: Globs;
    dest: string;
}
export interface LocalConfig {
    assets?: string | string[];
    browserList?: string | string[] | Record<string, string>;
    browserSync?: browserSync.Options;
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
    dirname: string;
    envFile?: string | false;
    createSeparateMinFiles?: boolean;
}
export interface BrowserSyncConfig extends browserSync.Options {
}
export interface CleanConfig {
    assets?: string | string[];
    favicon?: string | {
        dest: string;
    };
    fonts?: string | {
        dest: string;
    };
    icons?: string | {
        dest: string;
    };
    images?: string | {
        dest: string;
        destPhpPartials?: string;
    };
    scripts?: string | {
        dest: string;
    };
    styles?: string | {
        dest: string;
    };
}
export interface FaviconConfig extends BasicTaskConfig {
    color?: string;
    sizes?: FaviconSize[];
    imagemin?: {
        options?: imagemin.Options;
        optipng?: OptipngOptions;
    };
}
export interface FontsConfig extends BasicTaskConfig {
    srcFolder: string;
}
export interface IconsConfig extends BasicTaskConfig {
    destPhpPartials?: string | null | undefined;
    imagemin?: {
        options?: imagemin.Options;
        svgo?: SvgoOptions;
    };
}
export interface ImagesConfig extends BasicTaskConfig {
    destPhpPartials?: string | null | undefined;
    imagemin?: {
        options?: imagemin.Options;
        gifsicle?: GifsicleOptions;
        mozjpeg?: MozjpegOptions;
        optipng?: OptipngOptions;
        svgo?: SvgoOptions;
    };
}
export interface ScriptConfig extends BasicTaskConfig {
    features?: {
        typescript?: boolean;
        typeChecks?: boolean;
    };
}
export interface StylesConfig extends BasicTaskConfig {
    watch?: string | string[];
    sassOptions?: SassOptions;
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
export declare type PresetTargets = string | string[] | Record<string, string>;
export interface WpPotOptions {
    bugReport?: string;
    commentKeyword?: string;
    domain?: string;
    headers?: boolean | Record<string, string>;
    gettextFunctions?: Record<string, string>;
    lastTranslator?: string;
    metadataFile?: string;
    noFilePaths?: boolean;
    package?: string;
    relativeTo?: string;
    globOpts?: Record<string, string>;
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
export declare type WatchableTasks = 'styles' | 'scripts' | 'images' | 'icons';
