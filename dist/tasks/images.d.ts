import { TaskFunction } from 'gulp';
interface ImagesConfig {
    src: string | string[];
    dest: string;
    phpPartialsDest?: string | null | undefined;
}
export default function (config: ImagesConfig): TaskFunction;
export {};
