export interface FactoryOptions {
    errorOnUnusedConfig?: boolean;
    errorOnUnmatchedFile?: boolean;
    passThroughUnmatched?: boolean;
    passThroughMatched?: boolean;
    silent?: boolean;
    stats?: boolean;
    name: string;
}
