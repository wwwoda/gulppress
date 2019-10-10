import { TaskFunction } from 'gulp';
interface FaviconConfig {
    src: string | string[];
    dest: string;
}
export default function (config: FaviconConfig): TaskFunction;
export {};
