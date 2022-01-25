import type { TTF } from 'fonteditor-core';
import type rename from 'rename';

export type FontFactoryConfigs = FontConfig[] | Record<string, FontConfig | FontConfig[]>;

export interface FontFactoryOptions {
  errorOnUnusedConfig?: boolean;
  errorOnUnmatchedFile?: boolean;
  passThroughUnmatched?: boolean;
  passThroughMatched?: boolean;
  silent?: boolean;
  stats?: boolean;
  name?: string;
}

export type FontFormatWrite = 'ttf' | 'woff' | 'woff2';

export type FontFormatRead = FontFormatWrite | 'eot' | 'svg' | 'otf';

export interface FontConfig {
  rename?: string | rename.Transformer;
  format?: FontFormatWrite | FontFormatWrite[];
  subsetText?: string;
  subset?: TTF.CodePoint[];
  hinting?: boolean;
  compound2simple?: boolean;
}
