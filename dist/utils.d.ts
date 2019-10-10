interface ArgvConfig {
    _: string[];
    $0: string;
    dev?: boolean;
    env?: string;
    nodev?: boolean;
    watch?: boolean | string;
}
interface WatchersStatus {
    icons: boolean;
    images: boolean;
    scripts: boolean;
    styles: boolean;
    svg: boolean;
    vendorScripts: boolean;
    [propName: string]: boolean;
}
export declare function getArgv(): ArgvConfig;
export declare function getProxyUrl(url?: string): string;
export declare function getTheme(theme: string): string;
export declare function getWatchers(): WatchersStatus;
export declare function isDev(): boolean;
export declare function reload(done: CallableFunction): void;
export {};
