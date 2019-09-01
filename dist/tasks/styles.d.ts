/// <reference types="undertaker" />
interface StylesCompilerConfig {
    src: string | Array<string>;
    dest: string;
    includePaths: Array<string>;
    busterRelativePath: string;
}
export default function (config: StylesCompilerConfig): import("undertaker").TaskFunction;
export {};
