import { LocalConfig, MainConfig } from './types';
export declare function getLocalConfig(path: string): LocalConfig;
export declare function getMainConfig(path: string): MainConfig;
export declare function getConfig(dirname: string, mainConfigPath: string, localConfigPath?: string): MainConfig;
export declare function loadEnv(dirname: string, envFile?: string | false): void;
