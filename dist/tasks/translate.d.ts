/// <reference types="undertaker" />
interface TranslateConfig {
    src: string | Array<string>;
    dest: string;
    filename: string;
    options: {
        textDomain: string;
        packageName: string;
        bugReport: string;
        lastTranslator: string;
        team: string;
    };
}
export default function (config: TranslateConfig): import("undertaker").TaskFunction;
export {};
