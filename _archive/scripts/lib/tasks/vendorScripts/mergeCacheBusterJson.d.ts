/// <reference types="node" />
import { TaskFunction } from 'gulp';
export declare function mergeCacheBusterJsonTask(destFolder: string, json: Record<string, string> | (() => Record<string, string>)): TaskFunction;
export declare function mergeCacheBusterJsonStream(destFolder: string, json: Record<string, string> | (() => Record<string, string>)): NodeJS.ReadWriteStream;
