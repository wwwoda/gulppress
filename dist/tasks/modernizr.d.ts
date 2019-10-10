import { TaskFunction } from 'gulp';
import modernizr from 'gulp-modernizr';
interface ModernizrConfig {
    src: string | string[];
    dest: string;
    options: modernizr.Params;
}
export default function (config: ModernizrConfig): TaskFunction;
export {};
