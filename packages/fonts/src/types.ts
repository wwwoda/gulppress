import type { FontFactoryConfigs, FontFactoryOptions } from '@gulppress/gulp-font-factory';
import type { Globs } from 'gulp';

export interface FontsConfig {
  src: Globs;
  dest: string;
  displayName?: string;
  fontFactoryConfigs?: FontFactoryConfigs;
  fontFactoryOptions?: FontFactoryOptions;
}
