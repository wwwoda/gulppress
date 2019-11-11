import { TaskFunction } from 'gulp';
interface IconsConfig {
    src: string | string[];
    dest: string;
}
export default function (config: IconsConfig): TaskFunction;
export {};
