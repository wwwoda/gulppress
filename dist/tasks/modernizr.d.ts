/// <reference types="undertaker" />
interface ModernizrConfig {
    src: string | Array<string>;
    dest: string;
    options: modernizr.Params;
}

import modernizr from 'gulp-modernizr';

export default function (config: ModernizrConfig): import("undertaker").TaskFunction;
export {};
