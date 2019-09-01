/// <reference types="undertaker" />
interface ScriptCompilerConfig {
    src: string | Array<string>;
    dest: string;
    assets: string;
}
export default function (config: ScriptCompilerConfig): import("undertaker").TaskFunction;
export {};
