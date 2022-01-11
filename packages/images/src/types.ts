import type { BaseConfig } from '@gulppress/utils';
import type * as imagemin from 'gulp-imagemin';
import type { Options as GifsicleOptions } from 'imagemin-gifsicle';
import type { Options as MozjpegOptions } from 'imagemin-mozjpeg';
import type { Options as OptipngOptions } from 'imagemin-optipng';
import type { Options as SvgoOptions } from 'imagemin-svgo';

export interface ImagesConfig extends BaseConfig {
  destPhpPartials?: string | null | undefined;
  imagemin?: ImageMinConfig;
}

export interface ImageMinConfig {
  options?: imagemin.Options;
  gifsicle?: GifsicleOptions;
  mozjpeg?: MozjpegOptions;
  optipng?: OptipngOptions;
  svgo?: SvgoOptions;
}
