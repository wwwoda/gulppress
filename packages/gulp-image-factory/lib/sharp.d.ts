import sharp, { Sharp } from 'sharp';
import type { BufferFile } from 'vinyl';
import type { ImageFormat, SharpConfig } from './types';
export declare const createSharp: (file: BufferFile, config: SharpConfig, format: ImageFormat) => sharp.Sharp;
