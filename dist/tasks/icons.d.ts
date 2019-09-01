/// <reference types="undertaker" />
interface IconsConfig {
    src: string | Array<string>;
    dest: string;
}
export default function (config: IconsConfig): import("undertaker").TaskFunction;
export {};
