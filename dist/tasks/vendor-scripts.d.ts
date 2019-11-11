import { TaskFunction } from 'gulp';
interface VendorScriptsConfig {
    src: string | string[];
    dest: string;
}
export default function (config: VendorScriptsConfig): TaskFunction;
export {};
