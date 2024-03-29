import type { Globs, TaskFunction } from 'gulp';
import { createGenerateSvgPhpPartialStream } from '../stream/generate-svg-php-partials-stream';

export const createGenerateSvgPhpPartialsTask = (
  input: Globs | NodeJS.ReadWriteStream,
  destFolder: string,
  disableGulpChanged?: boolean,
): TaskFunction => () => (createGenerateSvgPhpPartialStream(input, destFolder, disableGulpChanged));
