import type { Transform } from 'stream';
import * as through from 'through2';
import Vinyl from 'vinyl';

export const createStream = (name: string, content: string): Transform => {
  const vinylFile = new Vinyl({
    path: name,
    contents: Buffer.from(content),
  });
  const stream = through.obj(function (
    _file: Vinyl,
    // eslint-disable-next-line no-undef
    _encoding: BufferEncoding,
    callback: through.TransformCallback,
  ): void {
    this.push(vinylFile);
    return callback();
  });
  stream.write(vinylFile);
  stream.end();
  return stream;
};
