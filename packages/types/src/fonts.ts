import type { FontFactoryConfigs, FontFactoryOptions } from '@gulppress/gulp-font-factory';
import type { BaseConfig } from './config';

export type FontsConfig = BaseConfig;
export interface Fonts2Config extends BaseConfig {
  fontFactoryConfigs?: FontFactoryConfigs;
  fontFactoryOptions?: FontFactoryOptions;
}
