/// <reference types="undertaker" />
interface FaviconConfig {
    src: string | Array<string>;
    dest: string;
}
export default function (config: FaviconConfig): import("undertaker").TaskFunction;
export {};
