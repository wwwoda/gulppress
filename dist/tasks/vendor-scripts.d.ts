/// <reference types="undertaker" />
interface VendorScriptsConfig {
    src: string | Array<string>;
    dest: string;
}
export default function (config: VendorScriptsConfig): import("undertaker").TaskFunction;
export {};
