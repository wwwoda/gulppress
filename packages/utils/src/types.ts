import type { Globs } from 'gulp';

export interface BaseConfig {
  src: Globs;
  dest: string;
  displayName?: string;
}
