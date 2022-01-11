import { TaskFunction } from 'gulp';
import { VendorScriptsConfig } from '../types';
import { compileVendorScriptsStream, compileVendorScriptsTask } from './vendorScripts/compileVendorScripts';
import { mergeCacheBusterJsonStream, mergeCacheBusterJsonTask } from './vendorScripts/mergeCacheBusterJson';
export declare function getVendorScriptsTask(config: VendorScriptsConfig | undefined, dirname: string): TaskFunction;
export declare const subtasks: {
    compileVendorScriptsStream: typeof compileVendorScriptsStream;
    compileVendorScriptsTask: typeof compileVendorScriptsTask;
    mergeCacheBusterJsonStream: typeof mergeCacheBusterJsonStream;
    mergeCacheBusterJsonTask: typeof mergeCacheBusterJsonTask;
};
