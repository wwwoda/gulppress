import type { BaseConfig } from '@gulppress/utils';
import type { WpPotOptions } from '.';

export interface TranslationConfig extends BaseConfig {
  wpPotOptions?: WpPotOptions;
}
