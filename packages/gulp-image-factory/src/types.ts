import type rename from 'rename';
import type sharp from 'sharp';

export type ImageFactoryConfigs = SharpConfig[] | Record<string, SharpConfig | SharpConfig[]>;

export interface ImageFactoryOptions {
  errorOnUnusedConfig?: boolean;
  errorOnUnmatchedFile?: boolean;
  passThroughUnmatched?: boolean;
  passThroughMatched?: boolean;
  silent?: boolean;
  stats?: boolean;
  name?: string;
}

export type ImageFormat = keyof ImageFormatOptions;

export interface ImageFormatOptions {
  jpeg?: sharp.JpegOptions;
  png?: sharp.PngOptions;
  webp?: sharp.WebpOptions;
  gif?: sharp.GifOptions;
  avif?: sharp.AvifOptions;
  heif?: sharp.HeifOptions;
  tiff?: sharp.TiffOptions;
  raw?: sharp.RawOptions;
}

export interface SharpConfig {
  rename?: string | rename.Transformer;
  format?: ImageFormat | ImageFormat[];
  formatOptions?: ImageFormatOptions;
  // Resizing images
  resize?: sharp.ResizeOptions;
  extractBeforeResize?: sharp.Region;
  extractAfterResize?: sharp.Region;
  trim?: number;
  extend?: number | sharp.ExtendOptions;
  // Image operation
  rotate?: {
    angle?: RotateParams[0],
    options?: RotateParams[1];
  };
  flip?: Parameters<sharp.Sharp['flip']>[0];
  flop?: Parameters<sharp.Sharp['flop']>[0];
  sharpen?: {
    sigma?: SharpenParams[0];
    flat?: SharpenParams[1];
    jagged?: SharpenParams[2];
  };
  median?: Parameters<sharp.Sharp['median']>[0];
  blur?: Parameters<sharp.Sharp['blur']>[0];
  flatten?: Parameters<sharp.Sharp['flatten']>[0];
  gamma?: Parameters<sharp.Sharp['gamma']>[0];
  negate?: Parameters<sharp.Sharp['negate']>[0];
  normalise?: Parameters<sharp.Sharp['normalise']>[0];
  normalize?: Parameters<sharp.Sharp['normalize']>[0];
  clahe?: Parameters<sharp.Sharp['clahe']>[0];
  convolve?: Parameters<sharp.Sharp['convolve']>[0];
  threshold?: {
    threshold?: ThresholdParams[0];
    options?: ThresholdParams[1];
  };
  boolean?: {
    operand: BooleanParams[0];
    operator: BooleanParams[1];
    options?: BooleanParams[2];
  };
  linear?: {
    a?: LinearParams[0];
    b?: LinearParams[1];
  };
  recomb?: Parameters<sharp.Sharp['recomb']>[0];
  modulate?: Parameters<sharp.Sharp['modulate']>[0];
  // Colour Manipulation
  tint?: Parameters<sharp.Sharp['tint']>[0];
  greyscale?: Parameters<sharp.Sharp['greyscale']>[0];
  grayscale?: Parameters<sharp.Sharp['grayscale']>[0];
  toColourspace?: Parameters<sharp.Sharp['toColourspace']>[0];
  toColorspace?: Parameters<sharp.Sharp['toColorspace']>[0];
}

type RotateParams = Parameters<sharp.Sharp['rotate']>;
type SharpenParams = Parameters<sharp.Sharp['sharpen']>;
type ThresholdParams = Parameters<sharp.Sharp['threshold']>;
type BooleanParams = Parameters<sharp.Sharp['boolean']>;
type LinearParams = Parameters<sharp.Sharp['linear']>;
