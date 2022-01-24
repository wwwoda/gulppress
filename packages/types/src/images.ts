import type * as imagemin from 'gulp-imagemin';
import type { Options as GifsicleOptions } from 'imagemin-gifsicle';
import type { Options as MozjpegOptions } from 'imagemin-mozjpeg';
import type { Options as OptipngOptions } from 'imagemin-optipng';
import type { Options as SvgoOptions } from 'imagemin-svgo';
import type { ImageFactoryConfigs, ImageFactoryOptions } from '@gulppress/gulp-image-factory';
import type { BaseConfig } from '.';

export interface ImagesConfig extends BaseConfig {
  destPhpPartials?: string | null | undefined;
  imageMinOptions?: ImageMinOptions;
  imageFactoryConfigs?: ImageFactoryConfigs;
  imageFactoryOptions?: ImageFactoryOptions;
}

export interface ImageMinOptions {
  options?: imagemin.Options;
  gifsicle?: GifsicleOptions;
  mozjpeg?: MozjpegOptions;
  optipng?: OptipngOptions;
  svgo?: SvgoOptions;
}
