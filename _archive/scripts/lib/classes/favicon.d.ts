/// <reference types="node" />
export declare type FaviconData = {
    size: number;
    error?: string;
    html?: string;
}[];
export declare type Manifest = {
    name: '';
    short_name: '';
    icons: ManifestIcon[];
    theme_color: string;
    background_color: string;
    display: 'standalone';
};
export declare type ManifestIcon = {
    src: string;
    sizes: string;
    type: 'image/png';
};
export declare type ResponsiveConfig = {
    width: number;
    height: number;
    fit: 'cover';
    skipOnEnlargement: true;
    rename: string;
};
export declare type Size = number | {
    size: number;
    rename: string;
};
export declare type Sizes = Array<Size>;
export declare type ValidColorString = string & {
    __validColorString: true;
};
export declare type SizeOfResponse = {
    width: number;
    height: number;
    type: string;
};
export declare class Favicon {
    size: number;
    color: string;
    private readonly defaultColor;
    private readonly baseManifest;
    processImage: import("stream").Transform;
    private static isSquare;
    getSize(): number;
    setSize(size: number): number;
    getColor(): string;
    setColor(color: string): void;
    getHtml(): string;
    static getReponsiveConfigs(sizes: Sizes): ResponsiveConfig[];
    getManifest(): string;
    private static getFaviconDataSortedBySize;
    private getManifestJson;
    private static isValidHexColor;
    private static getResponsiveConfig;
    private static getManifestIcon;
}
