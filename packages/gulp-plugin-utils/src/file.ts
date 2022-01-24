import Vinyl from 'vinyl';
import type { BufferFile } from 'vinyl';
import path from 'path';
import rename from 'rename';

export const createFile = <Format extends string>(
  file: BufferFile,
  buffer: Buffer,
  format: Format,
  filePathpath: string,
): BufferFile => {
  const newFile = new Vinyl({
    cwd: file.cwd,
    base: file.base,
    path: filePathpath,
    contents: buffer,
  });
  newFile.extname = `.${format}`;
  return newFile;
};

export const getFilePath = (
  file: Vinyl,
  renameTo: string | rename.Transformer,
): string => (
  rename
    ? path.join(file.base, rename(file.relative, renameTo).toString())
    : file.path
);
