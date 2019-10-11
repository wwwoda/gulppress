import { TaskFunction } from 'gulp';
declare type AssetItemType = string | {
    dest: string;
};
interface CleanConfig {
    assets?: string | string[];
    favicon?: AssetItemType;
    fonts?: AssetItemType;
    icons?: AssetItemType;
    images?: string | {
        dest: string;
        destPhpPartials?: string;
    };
    scripts?: AssetItemType;
    styles?: AssetItemType;
}
export default function (config: CleanConfig): {
    scriptsStyles: TaskFunction;
    assets: TaskFunction;
    all: TaskFunction;
};
export {};
