import type { BaseConfig } from '@gulppress/utils';
import type { WpPotOptions } from 'gulp-wp-pot';

export interface TranslationConfig extends BaseConfig {
  wpPotOptions?: WpPotOptions;
}
