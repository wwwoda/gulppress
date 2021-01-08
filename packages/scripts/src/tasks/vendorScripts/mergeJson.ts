import { dest, src, TaskFunction } from 'gulp';
import mergeJson from 'gulp-merge-json';

import gulppress from '../../interfaces';

export function getMergeCacheBusterJsonTask(
  folder: string,
  json: gulppress.IndexedObject | (() => gulppress.IndexedObject),
): TaskFunction {
  return (): NodeJS.ReadWriteStream => (getMergeCacheBusterJsonStream(folder, json));
}

export function getMergeCacheBusterJsonStream(
  folder: string,
  json: gulppress.IndexedObject | (() => gulppress.IndexedObject),
): NodeJS.ReadWriteStream {
  return src(`${folder}/.assets.json`)
    .pipe(
      mergeJson({
        fileName: '.assets.json',
        edit: parsedJson => ({ ...parsedJson, ...(json instanceof Function ? json() : json) }),
      }),
    )
    .pipe(dest(folder));
}
