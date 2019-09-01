/// <reference types="undertaker" />
interface ImagesConfig {
    src: string | Array<string>;
    dest: string;
}
export default function (config: ImagesConfig): import("undertaker").TaskFunction;
export {};
