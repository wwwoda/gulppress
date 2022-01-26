import type { Transform } from 'stream';
import PluginError from 'plugin-error';
import * as through from 'through2';
import Vinyl from 'vinyl';
import rename from 'rename';
import path from 'path';
import toIco from 'to-ico';

const createIco = (): Transform => through.obj(function (
  file: Vinyl,
  // eslint-disable-next-line no-undef
  _encoding: BufferEncoding,
  callback: through.TransformCallback,
): void {
  if (file.isNull()) {
    callback(null, file);
    return;
  }

  if (file.isStream()) {
    callback(new PluginError('gulpppress-favicon', 'Streaming not supported'));
    return;
  }

  if (!file.isBuffer()) {
    callback(new PluginError('gulpppress-favicon', 'Expected file to be a buffer.'));
  }

  const promise = toIco(file.contents as Buffer).then((buffer: Buffer): void => {
    const renameName: string = rename(file.relative, 'favicon.ico').toString();
    const filePath = path.join(file.base, renameName);
    this.push(new Vinyl({
      cwd: file.cwd,
      base: file.base,
      path: filePath,
      contents: buffer,
    }));
  });

  promise.then((): void => {
    callback();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, (err: any): void => {
    callback(new PluginError('gulpppress-favicon', err, { message: 'Error while transforming file' }));
  });
});

export default createIco;
