import type { FontFactoryConfigs, FontFactoryOptions } from '@gulppress/gulp-font-factory';
import type { BaseConfig } from '@gulppress/utils';

export interface FontsConfig extends BaseConfig {
  fontFactoryConfigs?: FontFactoryConfigs;
  fontFactoryOptions?: FontFactoryOptions;
}
