import type { BaseConfig } from '@gulppress/utils';
import type rename from 'rename';
import type sharp from 'sharp';
import type { SetOptional } from 'type-fest';
export interface FaviconConfig extends BaseConfig {
    manifest: ManifestProperties;
}
export interface SharpConfig {
    format?: keyof sharp.FormatEnum;
    formatOptions?: sharp.OutputOptions | sharp.JpegOptions | sharp.PngOptions | sharp.WebpOptions | sharp.AvifOptions | sharp.HeifOptions | sharp.GifOptions | sharp.TiffOptions;
    resize: sharp.ResizeOptions;
    rename: string | rename.Transformer;
}
export interface ManifestProperties {
    background_color?: string;
    categories?: string[];
    description?: string;
    dir?: ManifestDIR;
    display?: ManifestDisplay;
    display_override?: ManifestDisplayOverride[];
    iarc_rating_id?: string;
    icons?: ManifestIcon[];
    lang?: string;
    name: string;
    orientation?: ManifestOrientation;
    prefer_related_applications?: boolean;
    related_applications?: ManifestRelatedApplications[];
    scope?: string;
    screenshots?: ManifestScreenshot[];
    short_name: string;
    shortcuts?: ManifestShortscut[];
    start_url?: string;
    theme_color?: string;
}
export interface ManifestImage {
    src: string;
    sizes: string;
    type: string;
}
export interface ManifestRelatedApplications {
    platform?: string;
    url: string;
    id?: string;
}
export interface ManifestIcon extends ManifestImage {
    purpose?: string;
}
export interface ManifestScreenshot extends ManifestImage {
    platform?: ManifestScreenshotPlatform;
    label?: string;
}
export interface ManifestShortscut {
    name: string;
    short_name?: string;
    description?: string;
    url: string;
    icons?: SetOptional<ManifestIcon, 'type'>[];
}
export declare type ManifestDIR = 'auto' | 'ltr' | 'rtl';
export declare type ManifestDisplay = 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
export declare type ManifestDisplayOverride = 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser' | 'window-controls-overlay';
export declare type ManifestOrientation = 'any' | 'natural' | 'landscape' | 'landscape-primary' | 'landscape-secondary' | 'portrait' | 'portrait-primary' | 'portrait-secondary';
export declare type ManifestScreenshotPlatform = 'wide' | 'narrow' | 'android' | 'chromeos' | 'ios' | 'kaios' | 'macos' | 'windows' | 'xbox' | 'chrome_web_store' | 'play' | 'itunes' | 'microsoft-inbox' | 'microsoft-store';
