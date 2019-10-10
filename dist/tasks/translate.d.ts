import { TaskFunction } from 'gulp';
interface TranslateConfig {
    src: string | string[];
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
export default function (config: TranslateConfig): TaskFunction;
export {};
