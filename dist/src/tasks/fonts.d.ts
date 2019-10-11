import { TaskFunction } from 'gulp';
interface FontsConfig {
    srcPath: string;
    src: string | string[];
    dest: string;
}
export default function (config: FontsConfig): TaskFunction;
export {};
