import type { BaseConfig } from '@gulppress/utils';
import type { IOptions } from 'glob';

export interface TranslationConfig extends BaseConfig {
  wpPotOptions?: WpPotOptions;
}
