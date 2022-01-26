import type { BaseConfig } from '@gulppress/utils';
import type { IOptions } from 'glob';

interface GetTextFunction {
  name: string;
  plural?: number;
  context?: number;
}

export interface WpPotOptions {
  bugReport?: string;
  commentKeyword?: string;
  copyrightText?: string;
  domain?: string;
  headers?: boolean | Record<string, string>;
  gettextFunctions?: GetTextFunction[];
  lastTranslator?: string;
  metadataFile?: string;
  noFilePaths?: boolean;
  package?: string;
  relativeTo?: string;
  globOpts?: IOptions,
  team?: string;
  ignoreTemplateNameHeader?: boolean;
}
export interface TranslationConfig extends BaseConfig {
  wpPotOptions?: WpPotOptions;
}
