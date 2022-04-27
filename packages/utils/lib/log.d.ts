import type Undertaker from 'undertaker';
export declare const isSilent: () => boolean;
export declare const getOnCompleteMessage: (name: string) => string;
export declare const getSuccessLogger: (name: string) => Undertaker.TaskFunction;
export declare const logError: (error: Error) => void;
