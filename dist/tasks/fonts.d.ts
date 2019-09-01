/// <reference types="undertaker" />
interface FontsConfig {
    srcPath: string;
    src: string | Array<string>;
    dest: string;
}
export default function (config: FontsConfig): import("undertaker").TaskFunction;
export {};
