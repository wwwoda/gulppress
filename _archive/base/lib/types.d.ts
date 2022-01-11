import type { Globs } from 'gulp';
import type imagemin from 'gulp-imagemin';
import type { Options as GifsicleOptions } from 'imagemin-gifsicle';
import type { Options as MozjpegOptions } from 'imagemin-mozjpeg';
import type { Options as OptipngOptions } from 'imagemin-optipng';
import type { Options as SvgoOptions } from 'imagemin-svgo';
export interface Configs {
    favicon: FaviconConfig;
    fonts: FontsConfig;
    icons: IconsConfig;
    images: ImagesConfig;
    translate: TranslationConfig;
}
export interface BasicTaskConfig {
    src: Globs;
    dest: string;
}
/**
 * Favicon
 */
export interface FaviconConfig extends BasicTaskConfig {
    color?: string;
    sizes?: FaviconSize[];
    imagemin?: {
        options?: imagemin.Options;
        optipng?: OptipngOptions;
    };
}
export declare type FaviconSize = number | {
    size: number;
    rename: string;
};
/**
 * Fonts
 */
export interface FontsConfig extends BasicTaskConfig {
    srcFolder: string;
}
/**
 * Icons
 */
export interface IconsConfig extends BasicTaskConfig {
    destPhpPartials?: string | null | undefined;
    imagemin?: {
        options?: imagemin.Options;
        svgo?: SvgoOptions;
    };
}
/**
 * Images
 */
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
/**
 * Translate
 */
export interface TranslationConfig extends BasicTaskConfig {
    wpPotOptions?: WpPotOptions;
}
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
/**
 * Misc
 */
export declare type PresetTargets = string | string[] | Record<string, string>;
export declare type GlobsFunction = () => Globs;
